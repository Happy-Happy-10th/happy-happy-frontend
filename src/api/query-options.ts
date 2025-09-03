import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      retry: 0,
    },
    mutations: {
      gcTime: 0,
    },
  },
});

export { queryClient };
