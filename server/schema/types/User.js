const mongoose = require('mongoose');
const User = mongoose.model('User');
const typeDefs = `
type User {
    _id: ID!
    email: String!
    boards: [Board]
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
      return User.login(email, password);
    },
    signUp(_, { email, password }) {
      return User.signUp(email, password);
    },
  },
  User: {
    boards: async (parentValue) => {
      const user = await parentValue.populate('boards').execPopulate();
      return user.boards;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
