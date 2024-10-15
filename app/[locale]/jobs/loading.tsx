import { Skeleton } from '@/components/ui/skeleton';

export default function JobListingsLoading() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Jobs</h1>
      <JobListingsSkeleton />
    </div>
  );
}

export const JobListingsSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="rounded-lg border p-4">
        <Skeleton className="mb-2 h-6 w-48" /> {/* Title */}
        <Skeleton className="mb-2 h-4 w-32" /> {/* Company */}
        <Skeleton className="mb-2 h-4 w-28" /> {/* Location */}
        <Skeleton className="mb-2 h-4 w-24" /> {/* Salary */}
        <div className="mt-2 flex items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full" />{' '}
          {/* Profile Picture */}
          <div>
            <Skeleton className="mb-1 h-4 w-32" /> {/* Author's Name */}
            <Skeleton className="h-4 w-40" /> {/* Created At */}
          </div>
        </div>
      </div>
    ))}
  </div>
);
