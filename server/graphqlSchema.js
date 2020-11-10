const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    _id: ID,
    title: String,
    content: String
  },
  type User {
    _id: ID!,
    email: String!,
	  password: String!
	  tokens: [String!]
  },
  type AuthPayload {
  	token: String,
  	user: User
  },
  type Query {
    posts: [Post]
  },
  type Mutation {
    addPost(title: String!, content: String!): Post,
    login(email: String!, password: String!): AuthPayload
    signup(email: String, password: String!): AuthPayload,
  }
`;

module.exports = typeDefs;
