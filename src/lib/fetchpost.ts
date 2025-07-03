// lib/fetchPosts.ts

import { PageBlogPostOrder } from './__generated/sdk';

import { client, previewClient } from '@src/lib/client'; // The GraphQL client for fetching data

export const fetchPosts = async (page: number, postsPerPage: number, preview: boolean) => {
  const skip = (page - 1) * postsPerPage;
  const gqlClient = preview ? previewClient : client;

  try {
    const data = await gqlClient.pageBlogPostCollection({
      limit: postsPerPage,
      skip,
      order: PageBlogPostOrder.PublishedDateDesc,
      preview: false,
    });

    return {
      items: data.pageBlogPostCollection?.items || [],
      totalPosts: data.pageBlogPostCollection?.total || 0,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      items: [],
      totalPosts: 0,
    };
  }
};
