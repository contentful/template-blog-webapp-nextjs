import { GraphQLClient } from 'graphql-request';

import { getSdk } from '@src/lib/__generated/sdk';
import { endpoint } from 'codegen';

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
});

export const client = getSdk(graphQlClient);
export const previewClient = getSdk(previewGraphQlClient);

export const createGuestSpaceClient = ({
  domain = 'contentful.com',
  space_id,
  preview,
  preview_token,
  delivery_token,
}) =>
  getSdk(
    new GraphQLClient(`https://graphql.${domain}/content/v1/spaces/${space_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview ? preview_token : delivery_token}`,
      },
    }),
  );
