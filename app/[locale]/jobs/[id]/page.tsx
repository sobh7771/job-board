import ReactMarkdown from 'react-markdown';

import { BackButton } from '@/components/back-button';
import { Button } from '@/components/ui/button';
import { useFormatter } from '@/hooks/use-formatter';
import { sleep } from '@/lib/utils';

import { JobListingWithUser } from '../types';

export default async function JobDetailsPage() {
  await sleep(2000); // Simulate loading time
  return <JobDetails />;
}

// Main Job Details Component
function JobDetails() {
  const jobListingWithUser: JobListingWithUser = {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Co',
    location: 'San Francisco, CA',
    salary: 150000,
    description: `We are seeking a **talented Software Engineer** to join our team...`,
    requirements: `
  - Bachelor's degree in **Computer Science** or related field
  - 3+ years of experience in **software development**
  - Proficiency in **JavaScript** and **React**
  `,
    createdAt: Date.now(),
    user: {
      name: 'John Doe',
      profilePic: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    },
  };

  return (
    <div className="max-w-2xl mx-auto">
      <JobHeader
        title={jobListingWithUser.title}
        company={jobListingWithUser.company}
        location={jobListingWithUser.location}
        salary={jobListingWithUser.salary}
        user={jobListingWithUser.user}
        createdAt={jobListingWithUser.createdAt}
      />
      <JobSection title="Job Description">
        <ReactMarkdown>{jobListingWithUser.description}</ReactMarkdown>
      </JobSection>
      <JobSection title="Requirements">
        <ReactMarkdown>{jobListingWithUser.requirements}</ReactMarkdown>
      </JobSection>
      <div className="flex gap-4">
        <BackButton />
        <Button>Apply Now</Button>
      </div>
    </div>
  );
}

// Updated Job Header Component with job creation date
const JobHeader = ({
  title,
  company,
  location,
  salary,
  user,
  createdAt,
}: Pick<JobListingWithUser, 'title' | 'company' | 'location' | 'salary' | 'createdAt'> & {
  user: JobListingWithUser['user'];
}) => {
  const formatCurrency = useFormatter('currency');
  const formatDate = useFormatter('date');

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-600">{company}</p>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-600">{formatCurrency(salary!)}</p>

      {/* User Profile Section */}
      <div className="flex items-center gap-4 mt-4">
        <img
          src={user.profilePic!}
          alt={`${user.name}'s profile`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-sm text-gray-600">{user.name}</p>
          <p className="text-xs text-gray-400">Posted on {formatDate(createdAt!)}</p>
        </div>
      </div>
    </div>
  );
};

// Job Section Component
const JobSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);
