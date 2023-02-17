import { BaseConfig, createConsentManager } from '@contentful/experience-consent-manager';
import { useQuery } from 'react-query';

export const useCtfConsent = (props?: Pick<BaseConfig, 'onConsentChanged' | 'onError'>) =>
  useQuery({
    queryKey: ['osano-content'],
    queryFn: async () => {
      const manager = createConsentManager({
        appKey: process.env.NEXT_PUBLIC_OSANO_APP_KEY || '',
        osano: {
          configId: process.env.NEXT_PUBLIC_OSANO_CONFIG_ID || '',
        },
      });

      await manager.initialize({
        persistLocalConsent: true,
        ...props,
      });

      return manager;
    },
  });
