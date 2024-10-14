import React from 'react';

import { useUser } from '@/contexts/user-context';

export function UserName() {
  const user = useUser();

  return (
    <span className="text-lg min-w-28 font-medium text-gray-800">
      Welcome, {user?.name.split(' ')[0]}!
    </span>
  );
}
