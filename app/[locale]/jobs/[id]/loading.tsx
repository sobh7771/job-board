import { Skeleton } from '@/components/ui/skeleton';

export default async function JobDetailsLoading() {
  return <JobDetailsSkeleton />;
}

const JobDetailsSkeleton = () => (
  <div className="mx-auto max-w-2xl space-y-6">
    <Skeleton className="mb-4 h-8 w-64" /> {/* Job Title */}
    <div>
      <Skeleton className="mb-2 h-6 w-40" /> {/* Company */}
      <Skeleton className="mb-2 h-5 w-32" /> {/* Location */}
      <Skeleton className="h-5 w-28" /> {/* Salary */}
    </div>
    {/* User Profile Section */}
    <div className="mt-4 flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" /> {/* Profile Picture */}
      <div>
        <Skeleton className="mb-1 h-5 w-28" /> {/* User Name */}
        <Skeleton className="h-4 w-24" /> {/* Posted Date */}
      </div>
    </div>
    <div>
      <Skeleton className="mb-2 h-6 w-48" /> {/* Description Heading */}
      <Skeleton className="h-20 w-full" /> {/* Description Content */}
    </div>
    <div>
      <Skeleton className="mb-2 h-6 w-48" /> {/* Requirements Heading */}
      <Skeleton className="h-16 w-full" /> {/* Requirements Content */}
    </div>
    <Skeleton className="h-10 w-32" /> {/* Apply Button */}
  </div>
);
