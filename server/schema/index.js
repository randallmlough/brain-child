export const typeDefs = `
  type User {
    _id: ID!
    email: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): UserCredentials
    signUp(email: String!, password: String!): UserCredentials
  }
  type UserCredentials {
    _id: ID!
    token: String
  }
`;
