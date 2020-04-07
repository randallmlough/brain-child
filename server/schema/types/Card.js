const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const typeDefs = `
  type Card {
    _id: ID!
    title: String!
    list: List
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
    createCard(title: String!, list: ID!): CardResponse
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
    createCard(_, { title, list }) {
      return Card.createCard(title, list);
    },
  },
  Card: {
    list: async (parentValue) => {
      const card = await parentValue.populate('list').execPopulate();
      return card.list;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
