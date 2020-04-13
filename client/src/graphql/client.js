import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { typeDefs, resolvers } from './resolvers';
import { CURRENT_USER } from './queries/user';

const request = (operation) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

const createClient = async () => {
  const cache = new InMemoryCache({
    dataIdFromObject: (object) => object._id,
  });

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ networkError, graphqlErrors }) => {
        if (graphqlErrors) {
          graphqlErrors.forEach(({ message, locations, path, extensions }) => {
            console.group(
              '\x1b[31m%s\x1b[0m',
              '[GraphQL error] ',
              'Message: ',
              message,
            );
            console.log('Location: ', locations);
            console.log('Path: ', path);
            console.log('Extensions: ', extensions);
            console.groupEnd();
          });
        }
        if (networkError)
          console.log('\x1b[31m%s\x1b[0m', '[Network error]:', networkError);
      }),
      requestLink,
      new HttpLink({
        uri: '/graphql',
      }),
    ]),
    cache,
    typeDefs,
    resolvers,
  });

  if (localStorage.getItem('token')) {
    await client
      .query({
        query: CURRENT_USER,
      })
      .then(({ data }) => {
        if (!data || !data.me) client.resetStore();
      });
  }

  client.onResetStore(() => {
    localStorage.clear();
  });

  return client;
};

export default createClient;
