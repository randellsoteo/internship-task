# Internship Application Portal

A Full Stack Application built with Laravel 11 and React (Vite).
Allows candidates to apply and Admin to view/download resumes.

## Tech Stack
- **Backend:** Laravel 11 (API), SQLite Database
- **Frontend:** React.js, Tailwind CSS, Axios
- **Features:** File Uploads, Admin Dashboard, REST API

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone [YOUR_REPO_LINK_HERE]

**Backend Setup**
cd backend
composer install
cp .env.example .env

# Create the SQLite database file
touch database/database.sqlite

# Run Migrations
php artisan migrate

# Link Storage (Crucial for file downloads)
php artisan storage:link

# Start Server
php artisan serve

**Frontend Setup**
Open New Terminal

cd frontend
npm install
npm run dev