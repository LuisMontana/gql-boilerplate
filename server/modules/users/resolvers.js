const User = require("./user.model.js");

const resolvers = {
	Mutation: {
		signup: async (parent, args, context, info) => {
			const user = new User(args);
			await user.save();
			const token = await user.generateAuthToken();

			return {
				token,
				user,
			}
		},
		login: async (parent, args, context, info) => {
			const user = await User.findByCredentials(args.email, args.password)
			const token = await user.generateAuthToken();
			return {
				token,
				user
			};
		}
	}
}

module.exports = resolvers;
