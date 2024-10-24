import { NextPage } from 'next';

import { HydrationBoundary } from '@tanstack/react-query';
import { getDehydratedState, queryClient } from '@/lib/queryClient';

import { getJobListingsWithEmployers } from './getJobListingsWithEmployers';
import JobList from './JobList';

const JobListingsPage: NextPage = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['jobListingsWithEmployers'],
    queryFn: async () => {
      const res = await getJobListingsWithEmployers({ page: 1, perPage: 3 });
      const data = res?.data?.data;
      return {
        pages: [data],
        pageParams: [1],
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="container mx-auto flex h-full flex-col">
      <h1 className="mb-6 text-2xl font-bold">Jobs</h1>
      <HydrationBoundary state={getDehydratedState()}>
        <JobList />
      </HydrationBoundary>
    </div>
  );
};

export default JobListingsPage;
