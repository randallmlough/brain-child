const mongoose = require('mongoose');
const List = mongoose.model('List');

const typeDefs = `
  type List {
      _id: ID!
      name: String!
      cards: [Card]
  }
  type ListResponse {
      success: Boolean!
      message: String!
      list: List
  }
  extend type Query {
    lists: [List]
    list(id: ID!): List
  }

  input updateListInput {
    name: String
    cards: [ID!]
  }

  type DeleteListResponse {
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    createList(name: String!, board: ID!): ListResponse
    updateList(id: ID!, input: updateListInput!): ListResponse
    deleteList(id: ID!): DeleteListResponse
  }
  `;

const resolvers = {
  Query: {
    lists() {
      return List.find({});
    },
    list(_, { id }) {
      return List.findById(id);
    },
  },
  Mutation: {
    createList(_, { name, board }) {
      return List.createList(name, board);
    },
    updateList(_, { id, input }) {
      return List.updateList(id, input);
    },
    deleteList(_, { id }) {
      return List.deleteList(id);
    },
  },
  List: {
    cards: async (parentValue) => {
      const list = await parentValue.populate('cards').execPopulate();
      return list.cards;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
