'use client';
import Image from 'next/image';
import { FC } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScrollPaginator from '@/components/InfiniteScrollPaginator';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { JobListingWithEmployerDTO } from '@/domain/job-listing/JobListingRepository';
import { useFormatter } from '@/hooks/use-formatter';
import { Link } from '@/i18n/routing';

import { getJobListingsWithEmployers } from './getJobListingsWithEmployers';

export const DEFAULT_PER_PAGE = 3;

const fetchJobListingsWithEmployers = async ({ pageParam = 1 }) => {
  const result = await getJobListingsWithEmployers({
    page: pageParam,
    perPage: DEFAULT_PER_PAGE,
  });

  return result?.data?.data;
};

export default function JobList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['jobListingsWithEmployers'],
      queryFn: fetchJobListingsWithEmployers,
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage?.nextPage,
      staleTime: 5 * 60 * 1000,
    });

  return (
    <div className="h-full space-y-4">
      {data?.pages?.map(page =>
        page!.jobListings.map(job => <JobCard key={job.id} job={job} />)
      )}

      <InfiniteScrollPaginator
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
      />

      {isFetchingNextPage && (
        <div className="mt-4 flex w-full justify-center">
          <Spinner />
        </div>
      )}

      {!hasNextPage && !isFetchingNextPage && (
        <div className="mt-4 flex w-full justify-center">
          <p>No more job listings available.</p>
        </div>
      )}
    </div>
  );
}

const JobCard: FC<{ job: JobListingWithEmployerDTO }> = ({ job }) => {
  const formatCurrency = useFormatter('currency');
  const formatDate = useFormatter('date');

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">${formatCurrency(job.salary ?? 0)}</p>{' '}
      <div className="mt-2 flex items-center">
        <Image
          src={job.employer?.profilePic || '/default-profile.png'}
          alt={job.employer?.name || 'Unknown employer'}
          width={32}
          height={32}
          className="mr-2 rounded-full"
        />
        <div>
          <p className="text-gray-600">
            {job.employer?.name || 'Unknown employer'}
          </p>
          <p className="text-sm text-gray-500">
            Posted on {formatDate(job.createdAt!)}
          </p>
        </div>
      </div>
      <Button asChild className="mt-2">
        <Link href={`/jobs/${job.id}`}>View Details</Link>
      </Button>
    </div>
  );
};
