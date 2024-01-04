import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'YOUR_GRAPHQL_ENDPOINT', // Замените на ваш конечный пункт GraphQL
    cache: new InMemoryCache(),
});

export default client;
