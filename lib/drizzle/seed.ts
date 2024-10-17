import { v4 as uuidv4 } from 'uuid';

import { jobListingTable, Role, userTable } from '@/lib/drizzle/schema';

import { db } from './db';

// Note: Plain passwords are stored here and not hashed, so you cannot log in using these users.
const users = [
  {
    id: uuidv4(),
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'Passw0rd!',
    role: Role.JOB_SEEKER,
  },
  {
    id: uuidv4(),
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'Secur3@Key',
    role: Role.EMPLOYER,
  },
  {
    id: uuidv4(),
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'StrongP@ss1',
    role: Role.ADMIN,
  },
  {
    id: uuidv4(),
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'WonderW0man$',
    role: Role.JOB_SEEKER,
  },
  {
    id: uuidv4(),
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    password: 'M1ssion@Impossible',
    role: Role.EMPLOYER,
  },
];

const getUserId = (name: string) => {
  return users.find(user => user.name === name)!.id;
};

const jobListings = [
  {
    id: uuidv4(),
    title: 'Software Engineer',
    description: 'Develop and maintain web applications.',
    company: 'Tech Innovations',
    location: 'Remote',
    salary: 70000,
    requirements: '3+ years of experience in JavaScript and React.',
    userId: getUserId('Bob Johnson'),
    createdBy: getUserId('Bob Johnson'),
    updatedBy: getUserId('Bob Johnson'),
  },
  {
    id: uuidv4(),
    title: 'Project Manager',
    description: 'Lead project teams and manage timelines.',
    company: 'Global Solutions',
    location: 'New York, NY',
    salary: 90000,
    requirements: '5+ years of experience in project management.',
    userId: getUserId('Ethan Hunt'),
    createdBy: getUserId('Ethan Hunt'),
    updatedBy: getUserId('Ethan Hunt'),
  },
  {
    id: uuidv4(),
    title: 'UX/UI Designer',
    description: 'Design user-friendly interfaces and experiences.',
    company: 'Creative Minds',
    location: 'San Francisco, CA',
    salary: 80000,
    requirements: 'Experience with design tools such as Figma or Adobe XD.',
    userId: getUserId('Bob Johnson'),
    createdBy: getUserId('Bob Johnson'),
    updatedBy: getUserId('Bob Johnson'),
  },
  {
    id: uuidv4(),
    title: 'Data Analyst',
    description: 'Analyze and interpret complex data sets.',
    company: 'Data Insights',
    location: 'Chicago, IL',
    salary: 65000,
    requirements: 'Proficiency in SQL and data visualization tools.',
    userId: getUserId('Ethan Hunt'),
    createdBy: getUserId('Ethan Hunt'),
    updatedBy: getUserId('Ethan Hunt'),
  },
  {
    id: uuidv4(),
    title: 'Marketing Specialist',
    description: 'Develop and implement marketing strategies.',
    company: 'Market Leaders',
    location: 'Austin, TX',
    salary: 60000,
    requirements: 'Experience in digital marketing and analytics.',
    userId: getUserId('Bob Johnson'),
    createdBy: getUserId('Bob Johnson'),
    updatedBy: getUserId('Bob Johnson'),
  },
];

async function seed() {
  await db.transaction(async tx => {
    await Promise.all([
      tx.insert(userTable).values(users),
      tx.insert(jobListingTable).values(jobListings),
    ]);
  });

  console.log('Seeding completed!');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
});
