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

const hostSegments = new URL(process.env.SERVER_URL);

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink(
    new SubscriptionClient(`ws://${hostSegments.host}/graphql`, {
      reconnect: true
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
