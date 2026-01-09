Internship Application Portal
=============================

A Full Stack Application built with **Laravel 11** and **React (Vite)**.

Allows candidates to apply and Admin to view/download resumes.

Tech Stack
----------

*   **Backend:** Laravel 11 (API), SQLite Database
    
*   **Frontend:** React.js, Tailwind CSS, Axios
    
*   **Features:** File Uploads, Admin Dashboard, REST API
    

Setup Instructions
------------------

### 1\. Clone the repo

Bash

`   git clone [YOUR_REPO_LINK_HERE]   `

### 2\. Backend Setup

**Install dependencies and configure environment:**

Bash

`   cd backend  composer install  cp .env.example .env   `

**Database & Storage Configuration:**

Bash

`   # Create the SQLite database file  touch database/database.sqlite  # Run Migrations  php artisan migrate  # Link Storage (Crucial for file downloads)  php artisan storage:link   `

**Start the Server:**

Bash

`   php artisan serve   `

### 3\. Frontend Setup

_Open a new terminal_

**Install dependencies and start development server:**

Bash

`   cd frontend  npm install  npm run dev   `