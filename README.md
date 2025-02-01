# SkillSync: Collaborative Learning Platform

SkillSync is a peer-to-peer learning platform where users can connect to teach or learn specific skills. Users can create profiles, list skills they can teach, and request sessions for skills they want to learn. This application includes session scheduling, user management, and a review system.

## Features
- **User Authentication**: JWT-based signup and login.
- **Dashboard**: View a list of available teachers, their skills, and a calendar for scheduled sessions.
- **Skill Management**: Users can manage their teachable skills.
- **Session Booking**: Request learning sessions by selecting a skill, date, and time.
- **Review System**: Leave reviews after completing sessions.
- **Responsive Design**: Fully responsive across devices.

## Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites
- Node.js (>= 16)
- npm (>= 8) or yarn (>= 1.22)
- PostgreSQL

## Key Features
### User Roles
- Learners: Book sessions, leave reviews
- Teachers: Manage skills, set availability
- Admin: Manage users, view analytics

### Skill Management
- Add/remove teachable skills
- Categorize skills (Technical, Creative, Academic)
- Search and filter skills

### Session Booking
- Real-time availability checking
- Calendar integration
- Session status tracking (Scheduled/Completed/Cancelled)

### Frontend Setup:

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root of the frontend directory and add the following:
    ```env
    NEXT_PUBLIC_BASE_URL=<your-database-url>
    AUTH_SECRET=<your-jwt-secret>
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

### Admin:
- Email: admin@gmail.com
- Password: 123456
### Learner:
- Email: learner@gmail.com
- Password: 123456
### Teacher:
- Email: teacher@gmail.com
- Password: 123456

## Live URLs
-   **Frontend Deployment**: [Frontend Live URL](https://skill-sync-nine.vercel.app)
-   **Backend Deployment**: [Backend Live URL](https://skilsync-api.vercel.app/)

## Contact
For queries or support, reach out via [Mohammad Ali](mailto:mohammad..98482@gmail.com). or the project repository.

