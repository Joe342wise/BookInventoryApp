// DOM Elements
const booksTable = document.getElementById('booksTable');
const booksTableBody = booksTable.querySelector('tbody');
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');
const modalTitle = document.getElementById('modalTitle');
const bookId = document.getElementById('bookId');
const alertBox = document.getElementById('alertBox');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/books/';

// Event Listeners
addBookBtn.addEventListener('click', openAddBookModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
bookForm.addEventListener('submit', handleFormSubmit);
searchBtn.addEventListener('click', searchBooks);
searchInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    searchBooks();
  }
});

// Initial load
fetchBooks();

// Functions
function fetchBooks(query = '') {
  let url = API_BASE_URL;
  if (query) {
    url = `${API_BASE_URL}?search=${encodeURIComponent(query)}`;
  }
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderBooks(data);
    })
    .catch(error => {
      showAlert('Error fetching books: ' + error.message, 'error');
    });
}

function renderBooks(books) {
  booksTableBody.innerHTML = '';
  
  if (books.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align: center;">No books found</td>`;
    booksTableBody.appendChild(row);
    return;
  }
  
  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.published_date}</td>
      <td>$${book.price}</td>
      <td class="action-btns">
        <button class="btn btn-primary" onclick="editBook(${book.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
      </td>
    `;
    booksTableBody.appendChild(row);
  });
}

function openAddBookModal() {
  bookForm.reset();
  bookId.value = '';
  modalTitle.textContent = 'Add New Book';
  bookModal.style.display = 'flex';
}

function openEditBookModal(book) {
  bookId.value = book.id;
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('published_date').value = book.published_date;
  document.getElementById('price').value = book.price;
  modalTitle.textContent = 'Edit Book';
  bookModal.style.display = 'flex';
}

function closeModal() {
  bookModal.style.display = 'none';
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const bookData = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    isbn: document.getElementById('isbn').value,
    published_date: document.getElementById('published_date').value,
    price: document.getElementById('price').value
  };
  
  const isEdit = bookId.value !== '';
  const url = isEdit ? `${API_BASE_URL}${bookId.value}/` : API_BASE_URL;
  const method = isEdit ? 'PUT' : 'POST';
  
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err; });
    }
    return response.json();
  })
  .then(() => {
    closeModal();
    fetchBooks();
    showAlert(`Book ${isEdit ? 'updated' : 'added'} successfully!`, 'success');
  })
  .catch(error => {
    let errorMessage = 'An error occurred';
    if (error && typeof error === 'object') {
      errorMessage = Object.values(error).join('\n');
    } else if (error) {
      errorMessage = error.toString();
    }
    showAlert(errorMessage, 'error');
  });
}

function searchBooks() {
  const query = searchInput.value.trim();
  fetchBooks(query);
}

function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
  alertBox.style.display = 'block';
  
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 5000);
}

// Global functions for inline event handlers
window.editBook = function(bookId) {
  fetch(`${API_BASE_URL}${bookId}/`)
    .then(response => response.json())
    .then(book => {
      openEditBookModal(book);
    })
    .catch(error => {
      showAlert('Error fetching book details: ' + error.message, 'error');
    });
};

window.deleteBook = function(bookId) {
  if (confirm('Are you sure you want to delete this book?')) {
    fetch(`${API_BASE_URL}${bookId}/`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      fetchBooks();
      showAlert('Book deleted successfully!', 'success');
    })
    .catch(error => {
      showAlert('Error deleting book: ' + error.message, 'error');
    });
  }
};