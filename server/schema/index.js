const { makeExecutableSchema } = require('graphql-tools');
const types = require('./types');
const { merge } = require('lodash');
const otherTypeDefs = `
  type Query {
    _empty: Boolean
  } 

  type Mutation {
    _empty: Boolean   
  }
`;

const typeDefs = [...types.map((type) => type.typeDefs), otherTypeDefs];
const resolvers = merge(...types.map((type) => type.resolvers));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
module.exports = {
  schema,
  typeDefs,
  resolvers,
};
