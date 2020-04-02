const { ApolloServer } = require('apollo-server-express');
// Glue used for matching resolvers with type defs
const glue = require('schemaglue');
// Glue schemas/resolvers together
const { schema, resolver } = glue('src/backend/resolvers');

// Initialise Apollo server
const initApollo = (server, app) => {
  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    playground: {
      settings: {
        'editor.theme': 'dark'
      }
    },
    subscriptions: {
      keepAlive: 1000,
      onConnect: async (connectionParams, webSocket, context) => {
        // ...
      },
      onDisconnect: (webSocket, context) => {
        // ...
      }
    }
  });
  // Middleware: GraphQL
  apolloServer.applyMiddleware({
    app
  });
  // Apply subscription handlers
  apolloServer.installSubscriptionHandlers(server);
};

module.exports = {
  initApollo
};
