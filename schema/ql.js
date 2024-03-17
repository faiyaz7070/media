// schema/authSchema.js
const { buildSchema } = require('graphql');

const authSchema = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`);

module.exports = authSchema;
