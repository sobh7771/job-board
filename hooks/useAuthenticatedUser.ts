import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/auth/getUser';

const fetchAuthenticatedUser = async () => {
  return await getUser();
};

export const useAuthenticatedUser = () => {
  return useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: fetchAuthenticatedUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
