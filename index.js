// index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const authMiddleware = require('./middleware/auth')
const authSchema = require('./schema/ql');
const postschema=require("./schema/postschema")
const resolvers = require('./resolvers/resolver');
 const {connection}=require("./config/db")

const app = express();

// Connect to database


// Middleware
app.use(express.json());
app.use(authMiddleware);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
 schema: authSchema,
  rootValue: resolvers,
  graphiql: true,
}));
app.use('/post/graphql', graphqlHTTP({
  schema: postschema,
  rootValue: resolvers,
  graphiql: true,
}));
const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
  try {
    await connection
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server running on port ${PORT}`);
});
