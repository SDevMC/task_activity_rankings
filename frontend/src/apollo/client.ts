import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the Apollo Client
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql', // Your GraphQL server endpoint
    }),
    cache: new InMemoryCache(),
});

export default client;
