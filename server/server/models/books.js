const db = require('../config/db');

const Book = {};

Book.getAllBooks = (callback) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

Book.addBook = (book, callback) => {
  const { tittle, author, producer, price, quantity, category, purchaseDate, genre } = book;
  console.log('Tittle:', tittle);
  db.query('INSERT INTO books (tittle, author, producer, price, quantity, category, purchaseDate, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
  [tittle, author, producer, price, quantity, category, purchaseDate, genre], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

Book.deleteBook = (id, callback) => {
  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

Book.updateBook = (id, book, callback) => {
  const { title, author, producer, price, quantity, category, purchaseDate, genre } = book;
  db.query('UPDATE books SET tittle = ?, author = ?, producer = ?, price = ?, quantity = ?, category = ?, purchaseDate = ?, genre = ? WHERE id = ?', 
  [title, author, producer, price, quantity, category, purchaseDate, genre, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

module.exports = Book;
