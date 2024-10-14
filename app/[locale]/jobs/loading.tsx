import { Skeleton } from '@/components/ui/skeleton';

export default function JobListingsLoading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>
      <JobListingsSkeleton />
    </div>
  );
}

export const JobListingsSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="border p-4 rounded-lg">
        <Skeleton className="h-6 w-48 mb-2" /> {/* Title */}
        <Skeleton className="h-4 w-32 mb-2" /> {/* Company */}
        <Skeleton className="h-4 w-28 mb-2" /> {/* Location */}
        <Skeleton className="h-4 w-24 mb-2" /> {/* Salary */}
        <div className="flex items-center mt-2">
          <Skeleton className="h-8 w-8 rounded-full mr-2" /> {/* Profile Picture */}
          <div>
            <Skeleton className="h-4 w-32 mb-1" /> {/* Author's Name */}
            <Skeleton className="h-4 w-40" /> {/* Created At */}
          </div>
        </div>
      </div>
    ))}
  </div>
);
