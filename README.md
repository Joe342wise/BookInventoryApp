# Book Inventory API

>This is a backend API built with **Django** and **PostgreSQL** that allows users to perform full **CRUD operations** (Create, Read, Update, Delete) on a collection of books. The API uses **JSON responses** and is built with **function-based views (FBVs)**.

---

## Features

- Create a new book
- View all books or a specific book
- Update book information
- Delete a book
- JSON-based API (no templates)
- Environment variables using `.env` for database credentials

---

## Tech Stack

- **Backend Framework**: Django (Python)
- **Database**: PostgreSQL
- **API Style**: Function-Based Views (FBVs)
- **JSON**: Used for all request/response payloads

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd BookInventoryApp
```

## 2. Create and Activate Virtual Environment

```bash
python -m venv env
env\Scripts\activate # activate the virtual environment (env) on Windows
```

---

## 3. Install Dependencies

```bash
pip install django pycopg2 python-decouple
```

---

## 4. Set Up PostgreSQL

Ensure PostgreSQL is installed and running

Create a database and user:

```sql
CREATE DATABASE book_inventory;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILAGES ON DATABASE book_inventory TO myuser;
```

---

## 5. Create ```.env``` File

In the project root:

```env
DB_NAME=book_inventory
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=localhost
DB_PORT=5432
```

---

## Running the Project

Apply Migrations and Start Server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

## Project Sructure

```bash
BookInventoryApp/
├── books/
│   ├── models.py        # Book model
│   ├── views.py         # CRUD views
│   ├── urls.py          # App-specific URLs
├── config/
│   ├── settings.py      # DB config with decouple
│   ├── urls.py          # Main project URLs
├── .env                 # Environment variables
├── manage.py
```

---

## API Endpoints

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | `/api/books/`      | List all books         |
| POST   | `/api/books/`      | Create a new book      |
| GET    | `/api/books/<id>/` | Retrieve a single book |
| PUT    | `/api/books/<id>/` | Update a book          |
| DELETE | `/api/books/<id>/` | Delete a book          |

---
