import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    NormalizedCacheObject,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN = 'accessToken';

/**
 * Retrieves the session token from the logged in user, or public token if not logged in
 */
const withToken = setContext(async () => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (accessToken !== null) {
        return { token: accessToken };
    } else {
        return { token: 'public' };
    }
});

/**
 * Middleware for adding session token to headers of Apollo client requests
 */
const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = operation.getContext();
    operation.setContext(() => ({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    }));
    return forward(operation);
});

/**
 * Creates the Apollo client
 */
export default function createApolloClient(): ApolloClient<NormalizedCacheObject> {
    const httpLink = createHttpLink({
        uri: `${Constants.manifest.extra.GRAPHQL_ENDPOINT}/v1/graphql`,
    });
    const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)]);
    const cache = new InMemoryCache();
    const client = new ApolloClient({
        link,
        cache,
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
    });
    return client;
}
