import { dehydrate, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const getDehydratedState = () => {
  return dehydrate(queryClient);
};
