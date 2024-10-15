import { getTranslations } from 'next-intl/server';

import { PostJobForm } from '@/components/post-job-form';

export default async function PostJobPage() {
  const t = await getTranslations('postJobPage');

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">{t('title')}</h1>
      <PostJobForm />
    </div>
  );
}
