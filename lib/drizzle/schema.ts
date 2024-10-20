import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export enum Role {
  JOB_SEEKER = 'job-seeker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

export enum JobListingStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PENDING = 'pending',
}

export enum ApplicationStatus {
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  REJECTED = 'rejected',
}

export const roles = [Role.JOB_SEEKER, Role.EMPLOYER, Role.ADMIN] as const;
export const userStatuses = [
  UserStatus.ACTIVE,
  UserStatus.SUSPENDED,
  UserStatus.INACTIVE,
] as const;
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

export const userTable = sqliteTable('users', {
  id: text('id').$defaultFn(uuidv4).primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: roles }).$type<Role>().default(Role.JOB_SEEKER),
  verified: text('verified').default('false'),
  status: text('status', { enum: userStatuses })
    .$type<UserStatus>()
    .default(UserStatus.ACTIVE),
  profilePic: text('profile_pic').default('https://placehold.co/600'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
});

export const jobListingTable = sqliteTable('job_listings', {
  id: text('id').$defaultFn(uuidv4).primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  company: text('company').notNull(),
  location: text('location'),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  salary: integer('salary').notNull(),
  requirements: text('requirements').notNull(),
  status: text('status', { enum: jobListingStatuses })
    .$type<JobListingStatus>()
    .default(JobListingStatus.OPEN),
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(),
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
});

export const applicationTable = sqliteTable('applications', {
  id: text('id').$defaultFn(uuidv4).primaryKey(),
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
  status: text('status', { enum: applicationStatuses })
    .$type<ApplicationStatus>()
    .default(ApplicationStatus.SUBMITTED),
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(),
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
});

export const sessionTable = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(new Date()),
});

export type User = typeof userTable.$inferInsert;
export type JobListing = typeof jobListingTable.$inferInsert;
export type Application = typeof applicationTable.$inferInsert;
