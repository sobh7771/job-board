import { Lucia } from 'lucia';

// Import necessary modules from Lucia and Drizzle
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import { db } from '../drizzle/db'; // Import the database instance
import { sessionTable, User, userTable } from '../drizzle/schema'; // Import user schema

// Create an adapter for Lucia using Drizzle's SQLite adapter
const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

// Initialize the Lucia authentication system with the adapter
export const lucia = new Lucia(adapter, {
  // Configuration for session cookies
  sessionCookie: {
    // Set cookie expiration to false to create persistent cookies
    // Note: Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // Secure cookie flag set to true in production
      secure: process.env.NODE_ENV === 'production',
    },
  },

  // Function to map database user attributes to application-specific attributes
  getUserAttributes(databaseUserAttributes: User) {
    return {
      name: databaseUserAttributes.name,
      role: databaseUserAttributes.role,
    };
  },
});

// IMPORTANT: Extend the Lucia module to include our custom types
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia; // Register our instance of Lucia
    DatabaseUserAttributes: User; // Define the type for database user attributes
  }
}
