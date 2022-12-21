import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useContentfulEditorial } from '@src/_ctf-private';
import { PageBlogPostFieldsFragment, PageBlogPostQuery } from '@src/lib/__generated/sdk';

export const useBlogPostPage = ({ slug, initialData }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulEditorial();

  return useQuery<PageBlogPostQuery | undefined, unknown, PageBlogPostFieldsFragment>({
    queryKey: ['blogPostPage', locale, preview, slug],
    queryFn: () => client?.pageBlogPost({ slug, locale, preview }),
    select: data => {
      return data?.pageBlogPostCollection?.items[0] || initialData;
    },
    initialData,
    enabled: !!client,
  });
};
