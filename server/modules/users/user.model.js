const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { APP_SECRET } = require("../../utils/constants");

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email address is invalid');
			}
		}
	},
	password: {
		type: String,
		minlength: 7,
		trim: true,
		required: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Invalid password');
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

userSchema.static('findByCredentials', async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Unable to login');

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new Error('Unable to login');

	return user;
});

userSchema.method('generateAuthToken', async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, APP_SECRET);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token
});

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = model('user', userSchema);

module.exports = User;