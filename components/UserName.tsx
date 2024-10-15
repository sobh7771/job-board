import React from 'react';

import { useUser } from '@/contexts/user-context';

export function UserName() {
  const user = useUser();

  return (
    <span className="min-w-28 text-lg font-medium text-gray-800">
      Welcome, {user?.name.split(' ')[0]}!
    </span>
  );
}
