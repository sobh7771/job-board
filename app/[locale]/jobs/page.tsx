import { XCircle } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { JobListingWithEmployerDTO } from '@/domain/job-listing/JobListingRepository';
import { useFormatter } from '@/hooks/use-formatter';
import { Link } from '@/i18n/routing';

import { getJobListingsWithEmployers } from './getJobListingsWithEmployers';

const JobListingsPage: FC = async () => {
  const result = await getJobListingsWithEmployers({});

  if (result.isErr()) {
    const errorMessage = result.error.message;

    return (
      <div className="container mx-auto">
        <h1 className="mb-6 text-2xl font-bold">Jobs</h1>
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error fetching job listings</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const jobs = result.value;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Jobs</h1>
      {jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};

const JobList: FC<{ jobs: JobListingWithEmployerDTO[] }> = ({ jobs }) => (
  <div className="space-y-4">
    {jobs.map(job => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

const JobCard: FC<{ job: JobListingWithEmployerDTO }> = ({ job }) => {
  const formatCurrency = useFormatter('currency');
  const formatDate = useFormatter('date');

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">${formatCurrency(job.salary!)}</p>
      <div className="mt-2 flex items-center">
        <Image
          src={job.employer.profilePic}
          alt={job.employer.name!}
          width={32}
          height={32}
          className="mr-2 rounded-full"
        />
        <div>
          <p className="text-gray-600">{job.employer.name}</p>
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

export default JobListingsPage;
