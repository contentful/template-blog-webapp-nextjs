import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useContentfulEditorial } from '@src/_ctf-private';
import { PageBlogPostCollectionQuery, PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

export const useBlogPosts = ({ initialData, limit, order, where }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulEditorial();

  return useQuery<PageBlogPostCollectionQuery | undefined, unknown, PageBlogPostFieldsFragment[]>({
    queryKey: ['blogPosts', locale, preview, order, where],
    queryFn: () => client?.pageBlogPostCollection({ locale, preview, limit, order, where }),
    select: data => data?.pageBlogPostCollection?.items || initialData,
    initialData,
    enabled: !!client,
  });
};
