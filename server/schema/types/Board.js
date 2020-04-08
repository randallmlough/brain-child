const mongoose = require('mongoose');
const Board = mongoose.model('Board');

const typeDefs = `
    type Board {
        _id: ID!
        name: String!
        user: User
        lists: [List]
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

  input updateBoardInput {
    name: String
    lists: [ID!]
  }

  type DeleteBoardResponse {
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    createBoard(name: String!, user: ID!): BoardResponse
    updateBoard(id: ID!, input: updateBoardInput!): BoardResponse
    deleteBoard(id: ID!): DeleteBoardResponse
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
    updateBoard(_, { id, input }) {
      return Board.updateBoard(id, input);
    },
    deleteBoard(_, { id }) {
      return Board.deleteBoard(id);
    },
  },
  Board: {
    user: async (parentValue) => {
      const board = await parentValue.populate('user').execPopulate();
      return board.user;
    },
    lists: async (parentValue) => {
      const board = await parentValue.populate('lists').execPopulate();
      return board.lists;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
