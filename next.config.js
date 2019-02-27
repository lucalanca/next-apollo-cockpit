const gql = require('graphql-tag').default;
const fetch = require('isomorphic-unfetch').default;
const { createHttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const ApolloClient = require('apollo-client').default;

const ALL_MEMBERS_QUERY = gql`
{
  allMembers {
    _id
  }
}
`;

module.exports = {
  exportPathMap: async function (defaultPathMap) {
    const client = new ApolloClient({
      link: createHttpLink({
        uri: 'https://ginetta.cockpit.rocks/cockpitql/api/graphql?token=account-1f4269e927c90b0a0474f4796187c8',
        fetch: fetch,
      }),
      cache: new InMemoryCache(),
    });

    const result = await client.query({
      query: ALL_MEMBERS_QUERY
    });
    const memberRoutes = result.data.allMembers.reduce((acc, member) => ({
      ...acc,
      [`/members/${member._id}`]: { page: '/member', query: { slug: member._id } },
      [`/rest/members/${member._id}`]: { page: '/rest/member', query: { slug: member._id } },
    }), {});

    return {
      '/': { page: '/' },
      '/rest': { page: '/rest' },
      ...memberRoutes
    }
  }
}