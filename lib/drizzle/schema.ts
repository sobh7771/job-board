import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

// Enums for user roles
export enum Role {
  JOB_SEEKER = 'job-seeker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

// Enums for user status
export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

// Enums for job listing status
export enum JobListingStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PENDING = 'pending',
}

// Enums for application status
export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  REJECTED = 'rejected',
}

// Arrays for enums
export const roles = [Role.JOB_SEEKER, Role.EMPLOYER, Role.ADMIN] as const;
export const userStatuses = [UserStatus.ACTIVE, UserStatus.SUSPENDED, UserStatus.INACTIVE] as const;
export const jobListingStatuses = [
  JobListingStatus.OPEN,
  JobListingStatus.CLOSED,
  JobListingStatus.PENDING,
] as const;
export const applicationStatuses = [
  ApplicationStatus.SUBMITTED,
  ApplicationStatus.REVIEWED,
  ApplicationStatus.REJECTED,
] as const;

// Users Table
export const userTable = sqliteTable('users', {
  id: text('id').$defaultFn(uuidv4).primaryKey(), // Automatically generate the ID
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').$type<Role>().default(Role.JOB_SEEKER),
  verified: text('verified').default('false'),
  status: text('status').$type<UserStatus>().default(UserStatus.ACTIVE),
  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at').notNull().default(Date.now()),
});

// Job Listings Table
export const jobListingTable = sqliteTable('job_listings', {
  id: text('id').$defaultFn(uuidv4).primaryKey(), // Automatically generate the ID
  title: text('title').notNull(),
  description: text('description').notNull(),
  company: text('company').notNull(),
  location: text('location'),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  salary: integer('salary').notNull(), // Updated salary to be a number
  requirements: text('requirements').notNull(), // Added requirements field
  // keywords: text('keywords').array(), // Added keywords field as an array
  status: text('status').$type<JobListingStatus>().default(JobListingStatus.OPEN),
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(),
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(),
  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at').notNull().default(Date.now()),
});
// Applications Table
export const applicationTable = sqliteTable('applications', {
  id: text('id').$defaultFn(uuidv4).primaryKey(), // Automatically generate the ID
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  resume: text('resume'),
  coverLetter: text('cover_letter'),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  jobListingId: text('job_listing_id')
    .references(() => jobListingTable.id)
    .notNull(),
  status: text('status').$type<ApplicationStatus>().default(ApplicationStatus.SUBMITTED),
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(),
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(),
  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at').notNull().default(Date.now()),
});

// Sessions Table
export const sessionTable = sqliteTable('sessions', {
  id: text('id').primaryKey(), // Automatically generate the ID
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').notNull().default(Date.now()),
  updatedAt: integer('updated_at').notNull().default(Date.now()),
});

// Type Definitions for Type Inference
export type User = typeof userTable.$inferInsert;
export type JobListing = typeof jobListingTable.$inferInsert;
export type Application = typeof applicationTable.$inferInsert;
