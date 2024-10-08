import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

enum Role {
  JOB_SEEKER = 'job-seeker',
  EMPLOYER = 'employer',
  ADMIN = 'admin',
}

export const roleArray = [Role.JOB_SEEKER, Role.EMPLOYER, Role.ADMIN] as const;

// USERS TABLE
export const userTable = sqliteTable('users', {
  id: text('id').primaryKey(), // Primary Key: Unique ID for each user (UUID)
  name: text('name').notNull(), // User's full name
  email: text('email').unique().notNull(), // User's email (must be unique)
  password: text('password').notNull(), // User's hashed password
  role: text('role').default(Role.JOB_SEEKER), // User's role ('job-seeker', 'employer', 'admin')
  verified: text('verified').default('false'), // User verification status (true or false)

  // User account status (active, suspended, etc.)
  status: text('status').default('active'),

  // Timestamps
  createdAt: integer('created_at').notNull().default(Date.now()), // When the user was created
  updatedAt: integer('updated_at').notNull().default(Date.now()), // Last time the user was updated
});

// JOB LISTINGS TABLE
export const jobListingTable = sqliteTable('job_listings', {
  id: text('id').primaryKey(), // Primary Key: Unique ID for each job listing (UUID)
  title: text('title').notNull(), // Title of the job
  description: text('description').notNull(), // Job description
  company: text('company').notNull(), // Company name offering the job
  location: text('location'), // Job location (optional)

  // Foreign Key: References the user (employer) who posted the job
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),

  // Status of the job listing (open, closed, etc.)
  status: text('status').default('open'),

  // Tracking who created and updated the job listing
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(), // Who created the listing
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(), // Who last updated the listing

  // Timestamps
  createdAt: integer('created_at').notNull().default(Date.now()), // When the listing was created
  updatedAt: integer('updated_at').notNull().default(Date.now()), // Last time the listing was updated
});

// APPLICATIONS TABLE
export const applicationTable = sqliteTable('applications', {
  id: text('id').primaryKey(), // Primary Key: Unique ID for each application (UUID)
  fullName: text('full_name').notNull(), // Applicant's full name
  email: text('email').notNull().unique(), // Applicant's email address (must be unique)
  phone: text('phone').notNull(), // Applicant's phone number
  resume: text('resume'), // Resume (could be a file path or URL)
  coverLetter: text('cover_letter'), // Optional cover letter

  // Foreign Key: References the user who submitted the application
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),

  // Foreign Key: References the job listing the application is for
  jobListingId: text('job_listing_id')
    .references(() => jobListingTable.id)
    .notNull(),

  // Status of the application (submitted, reviewed, rejected, etc.)
  status: text('status').default('submitted'),

  // Tracking who created and updated the application
  createdBy: text('created_by')
    .references(() => userTable.id)
    .notNull(), // Who created the application
  updatedBy: text('updated_by')
    .references(() => userTable.id)
    .notNull(), // Who last updated the application

  // Timestamps
  createdAt: integer('created_at').notNull().default(Date.now()), // When the application was created
  updatedAt: integer('updated_at').notNull().default(Date.now()), // Last time the application was updated
});

// SESSIONS TABLE
export const sessionTable = sqliteTable('sessions', {
  id: text('id').primaryKey(), // Primary Key: Unique ID for each session (UUID)

  // Foreign Key: References the user who owns the session
  userId: text('user_id')
    .references(() => userTable.id)
    .notNull(),

  // Session expiration timestamp
  expiresAt: integer('expires_at').notNull(),

  // Timestamps
  createdAt: integer('created_at').notNull().default(Date.now()), // When the session was created
  updatedAt: integer('updated_at').notNull().default(Date.now()), // Last time the session was updated
});

// Type Definitions for Type Inference
export type User = typeof userTable.$inferInsert;
export type JobListing = typeof jobListingTable.$inferInsert;
export type Application = typeof applicationTable.$inferInsert;
