CREATE TABLE `boards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `columnValues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`value` text,
	`itemId` integer NOT NULL,
	`columnId` integer NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`columnId`) REFERENCES `columns`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `columns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`settings` text,
	`type` text NOT NULL,
	`isActive` integer DEFAULT true,
	`boardId` integer NOT NULL,
	FOREIGN KEY (`boardId`) REFERENCES `boards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`isActive` integer DEFAULT true,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`boardId` integer NOT NULL,
	FOREIGN KEY (`boardId`) REFERENCES `boards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `replies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text,
	`parentReplyId` integer,
	`itemId` integer NOT NULL,
	FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);