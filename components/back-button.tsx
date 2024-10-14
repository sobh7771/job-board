'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';

export const BackButton = () => {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Back</Button>;
};
