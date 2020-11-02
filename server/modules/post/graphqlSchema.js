const { gql } = require('apollo-server-express');

// Build schema with gql and using the GraphQL schema language
const typeDefs = gql`
  type Post {
    _id: ID,
    title: String,
    content: String
  },
  type Query {
    posts: [Post]
  },
  type Mutation {
    addPost(title: String!, content: String!): Post,
  }
`;

module.exports = typeDefs;