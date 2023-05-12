import { GraphQLClient } from 'graphql-request';

import { getSdk } from '@src/lib/__generated/sdk';
import { GuestSpaceParams } from '@src/pages/utils/handle-guest-space-params';
import { endpoint } from 'codegen';

const previewGraphQlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
});

/**
 * Returns an API Client which we can pass a custom domain and Authorization token to.
 * If the minimal requires parameters for a guestSpace are not returned; we simply return the previewGraphQlClient as is defined in this file, which will consume the preview API token.
 * @param {GuestSpaceParams} previewData - Parameters allowing us to pull data from a space other than the one defined with variables in our .env file
 */
export const createPreviewClient = (previewData = {}) => {
  const {
    preview_token,
    delivery_token,
    space_id,
    domain = 'contentful.com',
  } = previewData as GuestSpaceParams;

  const activeGuestSpace = Boolean(space_id) && Boolean(preview_token) && Boolean(delivery_token);

  if (activeGuestSpace) {
    const productionEndpoint = `https://graphql.${domain}/content/v1/spaces/${space_id}`;

    previewGraphQlClient.setEndpoint(productionEndpoint);
    previewGraphQlClient.setHeader('Authorization', `Bearer ${preview_token}`);
  }

  return getSdk(previewGraphQlClient);
};
