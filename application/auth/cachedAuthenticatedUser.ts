import { unstable_cache } from 'next/cache';

import { getUser } from '@/lib/auth/getUser';
import { CacheTags } from '@/lib/utils';

export const getCachedAuthenticatedUser = () => {
  const user = getUser();
  return unstable_cache(() => user, [CacheTags.AUTHENTICATED_USER], {
    tags: [CacheTags.AUTHENTICATED_USER],
  })();
};
