// schema/postSchema.js
const { buildSchema } = require('graphql');

const postSchema = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Post {
    _id: ID!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]!
  }

  type Mutation {
    createPost(content: String!): Post!
  }
`);

module.exports = postSchema;
