# Internship Application Portal

A Full Stack Application built with **Laravel 11** and **React (Vite)**.  
Allows candidates to apply and Admin to view/download resumes.

---

## 🛠 Tech Stack

* **Backend:** Laravel 11 (API), SQLite Database
* **Frontend:** React.js, Tailwind CSS, Axios
* **Features:** File Uploads, Admin Dashboard, REST API

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone [YOUR_REPO_LINK_HERE]
2. Backend Setup
Bash

cd backend
composer install
cp .env.example .env
Create the SQLite database file

Bash

touch database/database.sqlite
Run Migrations

Bash

php artisan migrate
Link Storage (Crucial for file downloads)

Bash

php artisan storage:link
Start Server

Bash

php artisan serve
3. Frontend Setup
Open a new terminal

Bash

cd frontend
npm install
npm run dev