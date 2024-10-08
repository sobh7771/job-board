'use client';

import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { logout } from './logout';

const LogoutBtn = () => {
  const { toast } = useToast();
  const { execute, isPending } = useAction(logout, {
    onSuccess(data) {
      if (data.data?.error) {
        toast({
          variant: 'destructive',
          title: 'Logout failed',
          description: data.data.error || 'An error occurred during logout.',
        });
      } else {
        toast({
          title: 'Logout successful',
          description: 'You have been logged out.',
        });
      }
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: 'An error occurred during logout.',
      });
    },
  });

  return (
    <Button variant="outline" onClick={() => execute()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
};

export default LogoutBtn;
