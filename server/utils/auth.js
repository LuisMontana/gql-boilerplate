const jwt = require("jsonwebtoken");
const User = require("../modules/users/user");
const { APP_SECRET } = require("../utils/constants");

const tradeTokenForUser = (token) => {
	const decoded = jwt.verify(token, APP_SECRET);
	return User.find({ _id: decoded._id, "tokens.token": decoded.token });
}

module.exports = tradeTokenForUser;