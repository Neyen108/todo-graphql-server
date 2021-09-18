const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { error, success } = require("consola");
const mongoose = require("mongoose");
const { PORT, mongodbUri } = require("./src/config/config");
const typeDefs = require("./src/graphql/typeDefs/typeDefs");
const resolvers = require("./src/graphql/resolvers/resolvers");
const { Todo } = require("./src/models/todo");
const cors = require("cors");

const app = express();

app.use(cors());

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: { Todo },
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: server.graphqlPath }
);

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

    httpServer.listen(PORT, () =>
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
