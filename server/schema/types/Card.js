const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const typeDefs = `
  type Card {
    _id: ID!
    title: String!
    description: String
    dueDate: Date
    label: String
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

  input updateCardInput {
    title: String
    description: String
    dueDate: Date
    label: String
    list: ID
  }

  type DeleteCardResponse {
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    createCard(title: String!, list: ID!): CardResponse
    updateCard(id: ID!, input: updateCardInput!): CardResponse
    deleteCard(id: ID!): DeleteCardResponse
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
    updateCard(_, { id, input }) {
      return Card.updateCard(id, input);
    },
    deleteBoard(_, { id }) {
      return Card.deleteCard(id);
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
