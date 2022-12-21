import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  ContentfulParams,
  editorialParameters,
  guestSpaceOptionalParameters,
  guestSpaceRequiredParameters,
  resetParam,
} from '@src/_ctf-private/constants';
import { getSdk } from '@src/lib/__generated/sdk';

interface ContentfulEditorialStore {
  xray: boolean;
  preview: boolean;
  domain?: 'contentful.com' | 'flinkly.com' | 'quirely.com';
  delivery_token?: string;
  preview_token?: string;
  space_id?: string;
}

export const useContentfulEditorialStore = create<ContentfulEditorialStore>()(
  persist(
    (_set, _get) => ({
      preview: false,
      xray: false,
      domain: 'contentful.com',
    }),
    {
      name: 'contentful-utility-store',
      getStorage: () => sessionStorage,
    },
  ),
);

export const useContentfulEditorial = () => {
  const { query } = useRouter();

  useEffect(() => {
    // If the reset parameter is passed, we reset the guest space store values and return early
    if (query[resetParam]) {
      [
        ...guestSpaceRequiredParameters,
        ...guestSpaceOptionalParameters,
        ...editorialParameters,
      ].forEach(key => {
        useContentfulEditorialStore.setState({ [key]: undefined });
      });

      return;
    }

    // Create a set of all the parameters that we care about
    const allParams = new Set([
      ...guestSpaceRequiredParameters,
      ...guestSpaceOptionalParameters,
      ...editorialParameters,
    ]);

    allParams.forEach(key => {
      const value = query[key];

      switch (key) {
        case ContentfulParams.preview:
        case ContentfulParams.xray:
          if (value === 'true' || value === '1')
            useContentfulEditorialStore.setState({ [key]: true });
          if (value === 'false' || value === '0')
            useContentfulEditorialStore.setState({ [key]: false });

          return;
        default:
          /**
           * If a reset parameter is passed, we want to return early and not set any default parameters
           */
          if (query[resetParam]) {
            return;
          }

          /**
           * Check if all required guest space parameters are available, we only update the store if they are
           */
          if (guestSpaceRequiredParameters.some(key => !query[key])) return;

          /**
           * If were dealing with an optional parameter, that wasn't passed, we delete the persisted value
           */
          if (guestSpaceOptionalParameters.includes(key as ContentfulParams) && !query[key]) {
            useContentfulEditorialStore.setState({ [key]: undefined });

            return;
          }

          useContentfulEditorialStore.setState({ [key]: value });
      }
    });
  }, [query]);

  const store = useContentfulEditorialStore();
  const { space_id, preview_token, delivery_token, domain, preview, xray } = store;

  /**
   * Check if we have all required parameters to make a guest space API client, or if we are not trying to reset the properties
   */
  if (guestSpaceRequiredParameters.some(key => !store[key]) || query[resetParam]) {
    return {
      preview,
      xray,
      client: null,
    };
  }

  const graphQlClient = new GraphQLClient(
    `https://graphql.${domain}/content/v1/spaces/${space_id}/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview ? preview_token : delivery_token}`,
      },
    },
  );
  return {
    preview,
    xray,
    client: getSdk(graphQlClient),
  };
};
