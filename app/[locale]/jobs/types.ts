import { JobListing, User } from '@/lib/drizzle/schema';

export type JobListingWithUser = Partial<JobListing> & {
  user: Partial<User> & { profilePic: string }; // Linked user who posted the job
};

// TODO: Remove the use of Partial when the full JobListing and User models are ready
// TODO: ProfilePic is a temporary addition, to be replaced when User schema is finalized
