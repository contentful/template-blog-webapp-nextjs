import { Asset, createClient, Entry, EntrySys } from 'contentful';

type BlogFields = {
  title: string;
  internalName: string;
  author: {
    sys: {
      id: string;
    };
  };
  slug: string;
  shortDescription: string;
  price: number;
  featuredImage: Asset;
  featuredBlogPost: BlogFields;
};

export type Blog = {
  contentTypeId: 'product';
  fields: BlogFields;
  sys: EntrySys;
};

const clientPreview = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

async function fetchEntry(query: object): Promise<Entry<Blog>> {
  const client = clientPreview;
  const entries = await client.getEntries<Blog>(query);
  return entries.items[0];
}

export async function fetchEntries(query: object): Promise<Entry<Blog>[]> {
  const client = clientPreview;
  const entries = await client.getEntries<Blog>(query);
  return entries.items;
}

export async function fetchAssets(query: object): Promise<Asset[]> {
  const client = clientPreview;
  const entries = await client.getAssets(query);
  return entries.items;
}

export async function getBlog(slug: string): Promise<Entry<Blog>> {
  const entry = await fetchEntry({
    'fields.slug': slug,
    content_type: 'pageBlogPost',
  });
  return entry;
}

export async function getAllBlogsForHome(): Promise<Entry<Blog>[]> {
  const entries = await fetchEntries({
    content_type: 'pageLanding',
    include: 2,
  });

  return entries;
}

export async function getAllBlogs(): Promise<Entry<Blog>[]> {
  const entries = await fetchEntries({
    content_type: 'pageBlogPost',
    include: 2,
  });

  return entries;
}

export const client = clientPreview;
