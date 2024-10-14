import Image from 'next/image';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useFormatter } from '@/hooks/use-formatter';
import { Link } from '@/i18n/routing';
import { sleep } from '@/lib/utils';

import { JobListingWithUser } from './types';

const jobs: JobListingWithUser[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Co',
    location: 'San Francisco, CA',
    salary: 120000,
    description: 'We are seeking a talented Software Engineer to join our team.',
    requirements: "Bachelor's degree in Computer Science or related field.",
    createdAt: Date.now(),
    user: {
      id: 'user1',
      name: 'John Doe',
      profilePic: `https://via.placeholder.com/150?t=${Date.now() + 1}`, // Different image URL with timestamp
    },
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Startup Inc',
    location: 'New York, NY',
    salary: 100000,
    description: 'We are looking for an experienced Product Manager.',
    requirements: '3+ years of experience in product management.',
    createdAt: Date.now(),
    user: {
      id: 'user2',
      name: 'Jane Smith',
      profilePic: `https://via.placeholder.com/150?t=${Date.now() + 2}`, // Different image URL with timestamp
    },
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Analytics Corp',
    location: 'Remote',
    salary: 130000,
    description: 'Join our team to analyze complex data sets.',
    requirements: 'Experience with Python and machine learning.',
    createdAt: Date.now(),
    user: {
      id: 'user3',
      name: 'Alice Johnson',
      profilePic: `https://via.placeholder.com/150?t=${Date.now() + 3}`, // Different image URL with timestamp
    },
  },
  {
    id: '4',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    salary: 95000,
    description: 'We need a creative UX Designer to enhance user experiences.',
    requirements: 'Strong portfolio and experience with design tools.',
    createdAt: Date.now(),
    user: {
      id: 'user4',
      name: 'Bob Williams',
      profilePic: `https://via.placeholder.com/150?t=${Date.now() + 4}`, // Different image URL with timestamp
    },
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Austin, TX',
    salary: 110000,
    description: 'Looking for a skilled DevOps Engineer to manage infrastructure.',
    requirements: 'Experience with AWS and CI/CD tools.',
    createdAt: Date.now(),
    user: {
      id: 'user5',
      name: 'Emily Davis',
      profilePic: `https://via.placeholder.com/150?t=${Date.now() + 5}`, // Different image URL with timestamp
    },
  },
];
const JobListingsPage: FC = async () => {
  await sleep(2000);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

const JobList: FC<{ jobs: JobListingWithUser[] }> = ({ jobs }) => (
  <div className="space-y-4">
    {jobs.map((job) => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

// JobCard component
const JobCard: FC<{ job: JobListingWithUser }> = ({ job }) => {
  const formatCurrency = useFormatter('currency');
  const formatDate = useFormatter('date'); // Use the date formatter

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">${formatCurrency(job.salary!)}</p>
      <div className="flex items-center mt-2">
        <Image
          src={job.user.profilePic}
          alt={job.user.name!}
          width={32}
          height={32}
          className="rounded-full mr-2"
        />
        <div>
          <p className="text-gray-600">{job.user.name}</p>
          <p className="text-gray-500 text-sm">Posted on {formatDate(job.createdAt!)}</p>
        </div>
      </div>
      <Button asChild className="mt-2">
        <Link href={`/jobs/${job.id}`}>View Details</Link>
      </Button>
    </div>
  );
};

export default JobListingsPage;
