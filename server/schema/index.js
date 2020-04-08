const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const types = require('./types');
const { merge } = require('lodash');
const otherTypeDefs = `
  scalar Date

  type Query {
    _empty: Boolean
  } 

  type Mutation {
    _empty: Boolean   
  }
`;

const typeDefs = [...types.map((type) => type.typeDefs), otherTypeDefs];

const resolverScalar = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

const resolvers = merge(...types.map((type) => type.resolvers), resolverScalar);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
module.exports = {
  schema,
  typeDefs,
  resolvers,
};
