import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface CustomQueryClientProviderProps {
  children: ReactNode;
}

export const CtfCustomQueryClientProvider = ({ children }: CustomQueryClientProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: true,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
