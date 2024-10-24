import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser';

export function UserName() {
  const { data: user, isLoading, isError, error } = useAuthenticatedUser();

  if (isLoading) {
    return <Skeleton className="h-6 min-w-28" />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || 'Something went wrong!'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <span className="min-w-28 text-lg font-medium text-gray-800">
      Welcome, {user?.name?.split(' ')[0] || 'Guest'}!
    </span>
  );
}
