# Job Board

A simple and modern job board application that connects job seekers with employers.

## 🚀 Demo

Check out the live demo here: [Job Board Demo](https://job-board-hems.onrender.com/)

## Features

- User Authentication (Registration, Login, Logout)
- Job listings for employers
- Job application management for job-seekers

## 🛠️ Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js, Drizzle ORM
- **Authentication**: Lucia
- **Database**: SQLite

## ⚙️ Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sobh7771/job-board.git
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

4. **Set up the database**:

   - Run the migrations or initialize the database using Drizzle ORM.

5. **Run database migrations**:

   - Apply any necessary migrations to prepare the database:

   ```bash
   pnpm run up:migrations
   ```

6. **Start using the app**:
   - Access the app at `http://localhost:3000/` after running the server.
