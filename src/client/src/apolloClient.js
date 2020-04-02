import { ApolloClient, ApolloLink } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  );

// Get server URL segments
const hostSegments = new URL(process.env.SERVER_URL);
const wsProtocol = hostSegments.protocol === 'https:' ? 'wss' : 'ws';

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink(
    new SubscriptionClient(`${wsProtocol}://${hostSegments.host}/graphql`, {
      reconnect: true,
      reconnectionAttempts: 5,
      timeout: 30000
    })
  ),
  createHttpLink({
    uri: `${process.env.SERVER_URL}/graphql`
  })
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export { apolloClient };
