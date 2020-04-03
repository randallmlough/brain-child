const mongoose = require('mongoose');
const Board = mongoose.model('Board');

const typeDefs = `
    type Board {
        _id: ID!
        name: String!
        user: User
    }
    type BoardResponse {
        success: Boolean!
        message: String!
        board: Board
    }
  extend type Query {
    boards: [Board]
    board(id: ID!): Board
  }

  extend type Mutation {
    createBoard(name: String!, user: ID!): BoardResponse
  }
  `;

const resolvers = {
  Query: {
    boards() {
      return Board.find({});
    },
    board(_, { id }) {
      return Board.findById(id);
    },
  },
  Mutation: {
    createBoard(_, { name, user }) {
      return Board.createBoard(name, user);
    },
  },
  Board: {
    user: async (parentValue) => {
      const board = await parentValue.populate('user').execPopulate();
      return board.user;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
