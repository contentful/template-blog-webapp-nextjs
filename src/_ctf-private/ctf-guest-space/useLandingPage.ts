import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useContentfulEditorial } from '@src/_ctf-private';
import { PageLandingFieldsFragment, PageLandingQuery } from '@src/lib/__generated/sdk';

export const useLandingPage = ({ initialData }) => {
  const { locale } = useRouter();
  const { client, preview } = useContentfulEditorial();

  return useQuery<PageLandingQuery | undefined, unknown, PageLandingFieldsFragment>({
    queryKey: ['landingPage', locale, preview],
    queryFn: () => client?.pageLanding({ locale, preview }),
    select: data => {
      return data?.pageLandingCollection?.items[0] || initialData;
    },
    initialData,
    enabled: !!client,
  });
};
