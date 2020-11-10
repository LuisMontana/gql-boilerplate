// #1 Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
// #2 Import mongoose
require('./config/database');

// #3 Import GraphQL type definitions
const typeDefs = require('./graphqlSchema');

// #4 Import GraphQL resolvers
const postResolvers = require('./modules/post/resolvers');
const userResolvers = require('./modules/users/resolvers');

const tradeTokenForUser = require('./utils/auth');

// #5 Initialize an Apollo server
const resolvers = merge(postResolvers, userResolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await tradeTokenForUser(authToken.replace('Bearer ', ''));
      }
    } catch {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      authToken,
      currentUser
    };
  }
});

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:${3000}${server.graphqlPath}`);
});