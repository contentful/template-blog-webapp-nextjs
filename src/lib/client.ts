import { GraphQLClient } from 'graphql-request';

import { getSdk } from '@src/lib/__generated/sdk';

const graphQlClient = new GraphQLClient(process.env.CONTENTFUL_GRAPHQL_ENDPOINT || '', {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);
