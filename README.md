# Book Inventory System

>A full-stack book inventory management system with Django backend and vanilla JavaScript frontend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Frontend Usage](#frontend-usage)
- [Development Status](#development-status)


## Features

### Backend
✔️ Full CRUD operations  
✔️ PostgreSQL database  
✔️ JSON API endpoints  
✔️ Environment configuration  
✔️ Function-based views  

### Frontend
✔️ Responsive interface  
✔️ Search functionality  
✔️ Modal forms  
✔️ Alert notifications  
✔️ No framework dependencies  

## Tech Stack

| Component       | Technology               |
|----------------|--------------------------|
| Backend        | Django (Python)          |
| Database       | PostgreSQL               |
| Frontend       | HTML5, CSS3, ES6         |
| API Client     | Fetch API                |
| Configuration  | python-decouple (.env)   |

## System Architecture

```bash
book-inventory/
├── backend/
│ ├── books/
│ │ ├── models.py
│ │ ├── views.py
│ │ └── urls.py
│ ├── config/
│ │ ├── settings.py
│ │ └── urls.py
│ ├── .env
│ └── manage.py
│
└── frontend/
├── index.html
├── styles.css
└── app.js
```

## Installation

### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourrepo/book-inventory.git
cd book-inventory/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install django psycopg2 python-decouple

# Configure database (PostgreSQL)
CREATE DATABASE book_inventory;
CREATE USER bookuser WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE book_inventory TO bookuser;

# Set environment variables (.env)
DB_NAME=book_inventory
DB_USER=bookuser
DB_PASSWORD=securepassword
DB_HOST=localhost
DB_PORT=5432

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

Update `API_BASE_URL` in `client/scripts.js`

Open `client/index.html` in browser

## API Documentation

Base URL: `http://localhost:8000/api/books/`

## API Documentation

**Base URL:** `http://localhost:8000/api/books/`

| Method | Endpoint       | Description          | Request Body                              |
|--------|---------------|----------------------|------------------------------------------|
| GET    | `/`           | List all books       | None                                     |
| POST   | `/`           | Create book          | `{title, author, isbn, published_date, price}` |
| GET    | `/<id>/`      | Get book details     | None                                     |
| PUT    | `/<id>/`      | Update book          | Partial book data                        |
| DELETE | `/<id>/`      | Delete book          | None                                     |

**Example Request:**
```json
POST /api/books/
{
  "title": "Dune",
  "author": "Frank Herbert",
  "isbn": "9780441013593",
  "published_date": "1965-08-01",
  "price": "9.99"
}
```

## Frontend Usage

### Viewing Books
- The main interface displays all books in a responsive table
- Columns include: Title, Author, ISBN, Published Date, Price
- Real-time search functionality filters results as you type

### Adding a New Book
1. Click the **"Add New Book"** button
2. Fill out the form in the modal:
   - **Title** (required)
   - **Author** (required)
   - **ISBN** (required, 13 digits)
   - **Published Date** (date picker)
   - **Price** (numeric field)
3. Click **"Save"** to submit

### Editing Existing Books
1. Click the **"Edit"** button on any book row
2. The form will pre-populate with current values
3. Make your changes
4. Click **"Save"** to update

### Deleting Books
1. Click the **"Delete"** button on any book row
2. A confirmation dialog will appear
3. Click **"Confirm"** to permanently delete

## Development Status

### Completed Features
| Feature               | Status |
|-----------------------|--------|
| CRUD Operations       | ✅     |
| Responsive Design     | ✅     |
| Search Functionality  | ✅     |
| Form Validation       | ✅     |
| Error Handling        | ✅     |

### In Progress
```diff
+ User Authentication System
+ API Documentation Page
! Performance Optimizations
```
