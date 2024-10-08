CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`resume` text,
	`cover_letter` text,
	`user_id` text NOT NULL,
	`job_listing_id` text NOT NULL,
	`status` text DEFAULT 'submitted',
	`created_by` text NOT NULL,
	`updated_by` text NOT NULL,
	`created_at` integer DEFAULT 1728276781243 NOT NULL,
	`updated_at` integer DEFAULT 1728276781243 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`job_listing_id`) REFERENCES `job_listings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `job_listings` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`company` text NOT NULL,
	`location` text,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'open',
	`created_by` text NOT NULL,
	`updated_by` text NOT NULL,
	`created_at` integer DEFAULT 1728276781243 NOT NULL,
	`updated_at` integer DEFAULT 1728276781243 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT 1728276781244 NOT NULL,
	`updated_at` integer DEFAULT 1728276781244 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'job-seeker',
	`verified` text DEFAULT 'false',
	`status` text DEFAULT 'active',
	`created_at` integer DEFAULT 1728276781243 NOT NULL,
	`updated_at` integer DEFAULT 1728276781243 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `applications_email_unique` ON `applications` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);