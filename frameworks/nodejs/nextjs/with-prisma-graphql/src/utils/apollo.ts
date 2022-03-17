import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'

let apolloClient: ApolloClient<any>

interface ClientOptions {
  headers?: Record<string, string>
  initialState?: Record<string, any>
}

/**
 * Helps to create a new apollo client from _app.tsx
 * @param initialState - Apollo's initial state
 * @returns a new apollo client
 */
export function useApollo(initialState?: Record<string, any>) {
  const client = createApolloClient({ initialState })

  return client
}

/**
 * Creates a new apollo client
 * @param param - createApolloClient parameters
 * @param param.initialState - Apollo's initial state
 * @param param.headers - HTTP headers
 * @returns the new client
 */
export function createApolloClient({ initialState, headers }: ClientOptions) {
  let nextClient = apolloClient
  const ssrMode = typeof window === 'undefined'

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    headers: headers,
    credentials: 'include',
  })

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: relayStylePagination([]),
              users: relayStylePagination([]),
              products: relayStylePagination([]),
              homeFeed: relayStylePagination(['type']),
              exploreFeed: relayStylePagination([]),
              replies: relayStylePagination([]),
              notifications: relayStylePagination(['isRead']),
              sessions: relayStylePagination([]),
              logs: relayStylePagination([]),
              reports: relayStylePagination([]),
            },
          },
          Topic: {
            fields: {
              posts: relayStylePagination(),
            },
          },
          User: {
            fields: {
              posts: relayStylePagination([]),
              bookmarks: relayStylePagination([]),
              following: relayStylePagination([]),
              followers: relayStylePagination([]),
            },
          },
          Product: {
            fields: {
              posts: relayStylePagination([]),
            },
          },
          Community: {
            fields: {
              posts: relayStylePagination([]),
              members: relayStylePagination([]),
              moderators: relayStylePagination([]),
            },
          },
          Post: {
            fields: {
              replies: relayStylePagination([]),
            },
          },
        },
      }),
    })
  }

  /**
   * If your page has Next.js data fetching methods that use Apollo Client,
   * the initial state gets hydrated here
   */
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = nextClient.extract()

    /**
     * Restore the cache using the data passed from
     * getStaticProps/getServerSideProps combined with the existing cached data
     */
    nextClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (ssrMode) return nextClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = nextClient

  return nextClient
}
