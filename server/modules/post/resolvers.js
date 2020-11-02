const Post = require('./models/post.model.js');

const resolvers = {
  Query: {
    // Query which returns posts list
    posts: () => Post.find({}),
  },

  Mutation: {
    addPost: (parent, post) => {
      // Create a new record in the database
      const newPost = new Post({ title: post.title, content: post.content });
      // Save the record and return it
      return newPost.save();
    }
  }
};

module.exports = resolvers;