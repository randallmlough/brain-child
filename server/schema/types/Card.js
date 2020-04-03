const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const typeDefs = `
  type Card {
    _id: ID!
    title: String!
    board: Board
  }
  type CardResponse {
    success: Boolean!
    message: String!
    card: Card
}
  extend type Query {
    cards: [Card]
    card(id: ID!): Card
  }

  extend type Mutation {
    createCard(title: String!, board: ID!): CardResponse
  }
  `;

const resolvers = {
  Query: {
    cards() {
      return Card.find({});
    },
    card(_, { id }) {
      return Card.findById(id);
    },
  },
  Mutation: {
    createCard(_, { title, board }) {
      return Card.createCard(title, board);
    },
  },
  Card: {
    board: async (parentValue) => {
      const card = await parentValue.populate('board').execPopulate();
      return card.board;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
