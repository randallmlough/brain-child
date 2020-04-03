const mongoose = require('mongoose');
const User = mongoose.model('User');
const typeDefs = `
type User {
    _id: ID!
    email: String!
}
  type UserCredentials {
    _id: ID!
    token: String
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    login(email: String!, password: String!): UserCredentials
    signUp(email: String!, password: String!): UserCredentials
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
};

module.exports = {
  typeDefs,
  resolvers,
};
