import { Skeleton } from '@/components/ui/skeleton';

export default async function JobDetailsLoading() {
  return <JobDetailsSkeleton />;
}

const JobDetailsSkeleton = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <Skeleton className="h-8 w-64 mb-4" /> {/* Job Title */}
    <div>
      <Skeleton className="h-6 w-40 mb-2" /> {/* Company */}
      <Skeleton className="h-5 w-32 mb-2" /> {/* Location */}
      <Skeleton className="h-5 w-28" /> {/* Salary */}
    </div>
    {/* User Profile Section */}
    <div className="flex items-center gap-4 mt-4">
      <Skeleton className="w-12 h-12 rounded-full" /> {/* Profile Picture */}
      <div>
        <Skeleton className="h-5 w-28 mb-1" /> {/* User Name */}
        <Skeleton className="h-4 w-24" /> {/* Posted Date */}
      </div>
    </div>
    <div>
      <Skeleton className="h-6 w-48 mb-2" /> {/* Description Heading */}
      <Skeleton className="h-20 w-full" /> {/* Description Content */}
    </div>
    <div>
      <Skeleton className="h-6 w-48 mb-2" /> {/* Requirements Heading */}
      <Skeleton className="h-16 w-full" /> {/* Requirements Content */}
    </div>
    <Skeleton className="h-10 w-32" /> {/* Apply Button */}
  </div>
);
