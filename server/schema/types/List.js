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

  extend type Mutation {
    createList(name: String!, board: ID!): ListResponse
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
