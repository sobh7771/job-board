import { useTranslations } from 'next-intl';
import { MouseEventHandler } from 'react';

import { logout } from '@/app/[locale]/logout';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/user-context';
import { useToast } from '@/hooks/use-toast';
import { Link, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { UserName } from './UserName';

export function AuthButtons() {
  const user = useUser();
  const t = useTranslations('rootLayout');
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await logout();

      if (res?.data?.success) {
        router.replace('/');
        toast({
          title: 'Logout Successful',
          description: 'You have been logged out successfully.',
        });
        return;
      }

      const errorMessage =
        res?.data?.error || res?.serverError || 'An unknown error occurred.';
      toast({
        title: 'Logout Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } catch {
      toast({
        title: 'Logout Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          'flex gap-4  transition-all duration-500',
          user
            ? 'slide-in-from-left-50 animate-in fade-in-50'
            : 'animate-out fade-out-50'
        )}
      >
        {user ? (
          <>
            <UserName />
            <Button
              variant="outline"
              onClick={handleLogout}
              aria-label="Logout"
            >
              {t('logout')}
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="outline" aria-label="Login">
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button asChild aria-label="Register">
              <Link href="/register">{t('register')}</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
