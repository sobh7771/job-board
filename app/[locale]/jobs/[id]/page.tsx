import { XCircle } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { BackButton } from '@/components/back-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { JobListingWithEmployerDTO } from '@/domain/job-listing/JobListingRepository';
import { useFormatter } from '@/hooks/use-formatter';

import { getJobListingWithEmployer } from './getJobListingWithEmployer';

export default async function JobDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const result = await getJobListingWithEmployer({ id });

  if (result.isErr()) {
    const errorMessage =
      result.error.name === 'ValidationError'
        ? 'Invalid UUID'
        : result.error.message;

    return (
      <div className="container mx-auto">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error fetching job listing</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const jobListingWithEmployer = result.value;
  console.log(jobListingWithEmployer);

  return <JobDetails jobListingWithEmployer={jobListingWithEmployer} />;
}

async function JobDetails({
  jobListingWithEmployer,
}: {
  jobListingWithEmployer: JobListingWithEmployerDTO;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <JobHeader
        title={jobListingWithEmployer.title}
        company={jobListingWithEmployer.company}
        location={jobListingWithEmployer.location}
        salary={jobListingWithEmployer.salary}
        user={jobListingWithEmployer.employer}
        createdAt={jobListingWithEmployer.createdAt}
      />
      <JobSection title="Job Description">
        <ReactMarkdown>{jobListingWithEmployer.description}</ReactMarkdown>
      </JobSection>
      <JobSection title="Requirements">
        <ReactMarkdown>{jobListingWithEmployer.requirements}</ReactMarkdown>
      </JobSection>
      <div className="flex gap-4">
        <BackButton />
        <Button>Apply Now</Button>
      </div>
    </div>
  );
}

const JobHeader = ({
  title,
  company,
  location,
  salary,
  user,
  createdAt,
}: Pick<
  JobListingWithEmployerDTO,
  'title' | 'company' | 'location' | 'salary' | 'createdAt'
> & {
  user: JobListingWithEmployerDTO['employer'];
}) => {
  const formatCurrency = useFormatter('currency');
  const formatDate = useFormatter('date');

  return (
    <div className="mb-6">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="text-xl text-gray-600">{company}</p>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-600">{formatCurrency(salary!)}</p>
      <div className="mt-4 flex items-center gap-4">
        <Image
          src={user.profilePic!}
          alt={`${user.name}'s profile`}
          className="h-12 w-12 rounded-full"
          width={48}
          height={48}
        />
        <div>
          <p className="text-sm text-gray-600">{user.name}</p>
          <p className="text-xs text-gray-400">
            Posted on {formatDate(createdAt!)}
          </p>
        </div>
      </div>
    </div>
  );
};

const JobSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
    {children}
  </div>
);
