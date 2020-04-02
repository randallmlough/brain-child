const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');
const User = mongoose.model('User');

const typeDefs = `
  type User {
    _id: ID!
    email: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): UserCredentials
    signUp(email: String!, password: String!): UserCredentials
  }
  type UserCredentials {
    _id: ID!
    token: String
  }
`;

const resolvers = {
  Query: {
    me(_, __, context) {
      return context.user;
    },
  },
  Mutation: {
    login(_, { email, password }) {
      // login method used in MERN project
      return User.login(email, password);
    },
    signUp(_, { email, password }) {
      return User.signUp(email, password);
    },
  },
  User: {},
};

module.exports = {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: (e) => console.log('\x1b[31m%s\x1b[0m', e.message) },
  }),
  typeDefs,
  resolvers,
};
