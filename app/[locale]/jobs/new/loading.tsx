import { getTranslations } from 'next-intl/server';

import { Skeleton } from '@/components/ui/skeleton';

export default async function PostJobLoading() {
  const t = await getTranslations('postJobPage');

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <PostJobFormSkeleton />
    </div>
  );
}
export function PostJobFormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-full" /> {/* Job Title */}
      <Skeleton className="h-10 w-full" /> {/* Company Name */}
      <Skeleton className="h-10 w-full" /> {/* Location */}
      <Skeleton className="h-10 w-full" /> {/* Job Type */}
      <Skeleton className="h-10 w-full" /> {/* Salary */}
      <Skeleton className="h-[200px] w-full" /> {/* Job Description */}
      <Skeleton className="h-[200px] w-full" /> {/* Job Requirements */}
      <Skeleton className="h-10 w-full" /> {/* Keywords */}
      <Skeleton className="h-10 w-full" /> {/* Submit Button */}
    </div>
  );
}
