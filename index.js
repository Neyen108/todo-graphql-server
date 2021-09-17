const express = require("express");
const { PORT, mongodbUri } = require("./src/config/config");
const { ApolloServer, gql } = require("apollo-server-express");
const { error, success } = require("consola");
const typeDefs = require("./src/graphql/typeDefs/typeDefs");
const resolvers = require("./src/graphql/resolvers/resolvers");
const mongoose = require("mongoose");
const { Todo } = require("./src/models/todo");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Todo },
});

const startApp = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    success({
      message: `Successfully connected with database`,
      badge: true,
    });
    //Inject Apollo server express middleware
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      success({
        message: `Server started on PORT ${PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    error({ message: err.message, badge: true });
  }
};

startApp();
