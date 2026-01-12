# Internship Application Portal (Full Stack)

An Applicant Tracking System (ATS) built with **Laravel 11** and **React**.
Features a modern UI, file handling, server-side pagination, and dynamic sorting.

![Tech Stack](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tech Stack](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## Key Features

*   **Create:** Public application form with **File Uploads** (PDF/DOCX).
*   **Read & Manage:** Admin Dashboard with **Server-Side Pagination** (5 records/page).
*   **Sort & Filter:** Dynamic column sorting (A-Z / Z-A) and real-time search.
*   **Secure:** Resume files are stored securely and served via temporary URLs.
*   **Validation:** Robust backend validation for file types and sizes.
*   **Modern UI:** Built with Tailwind CSS, featuring loading states and responsive tables.

---

## Setup Instructions

You can run this project in the cloud (GitHub Codespaces) or locally on your machine.

### Option A: GitHub Codespaces (Recommended ☁️)

This project is configured to run instantly in the cloud without installing PHP or Node.js locally.

1.  Click the **Code** button on this repo -> **Codespaces** -> **Create codespace on main**.
2.  Wait for the environment to build.
3.  Open the terminal and run the **Setup Commands** below.

### Option B: Local VS Code 💻

**Prerequisites:** PHP 8.2+, Composer, Node.js.

1.  Clone the repository:
    ```bash
    git clone https://github.com/randellsoteo/internship-task
    cd internship-task
    ```

---

## Run the Project

### 1. Backend Setup (Laravel)

Open a terminal in the root folder and run:

```bash
cd backend
composer install
cp .env.example .env

# Create SQLite Database (Zero-config setup)
touch database/database.sqlite

# Run Migrations
php artisan migrate

# Link Storage (Crucial for resume downloads)
php artisan storage:link

# Start Server
php artisan serve
```

*The Backend will run on http://127.0.0.1:8000*

### 2. Frontend Setup (React + Vite)

Open a **second** terminal tab and run:

```bash
cd frontend
npm install
npm run dev
```

*The Frontend will run on http://localhost:5173*

---

## ⚠️ Important Configuration Notes

### 1. File Permissions (Linux/Mac/Codespaces)

If you encounter a `500 Error` when uploading files or viewing the database, ensure the server has write permissions:

```bash
# Run this inside the backend/ folder
chmod -R 777 storage database
```

### 2. CORS & Proxy

This project uses a **Vite Proxy** (`vite.config.js`) to tunnel requests from the frontend to the backend. This eliminates CORS issues during development.

*   **Frontend Target:** `/api/...`
*   **Proxies To:** `http://127.0.0.1:8000`

---

## 🔒 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/applicants` | Fetch paginated list (params: `page`, `sort_by`, `search`) |
| `POST` | `/api/applicants` | Submit new application (`multipart/form-data`) |
| `PUT` | `/api/applicants/{id}` | Update applicant status |
| `DELETE` | `/api/applicants/{id}` | Remove applicant and delete resume file |

---