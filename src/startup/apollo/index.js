import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
    uri: 'https://smartcoinback.herokuapp.com/graphql',
    // uri: 'http://localhost:3000/graphql'
    // uri: 'http://localhost:3000/graphql',
    // uri: 'http://backendapi-env.eba-sfqyft6z.us-east-2.elasticbeanstalk.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token,
        },
    };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
    defaultOptions: {
        watchQuery: {
            errorPolicy: "all",
        },
        query: {
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});

export const walletAddressVar = makeVar(null);
export const walletVar = makeVar(null);

export default client;