const db = require('../config/db');

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null; // Handle null or undefined dates
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const Reservations = {
  getLendBooks: (callback) => {
    db.query('SELECT * FROM lendBooks', callback);
  },
  getReturnedBooks: (callback) => {
    db.query('SELECT * FROM returnedBooks', callback);
  },
  addLendBook: (newBook, callback) => {
    // Format date fields
    const formattedBook = {
      ...newBook,
      issueDate: formatDate(newBook.issueDate),
      returnDate: formatDate(newBook.returnDate),
    };

    db.query('INSERT INTO lendBooks SET ?', formattedBook, (err, results) => {
      if (err) {
        console.error('Error inserting new lend book:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  returnBook: (bookId, returnedBook, callback) => {
    // Validate bookId
    if (!bookId || bookId === 'undefined') {
      const err = new Error('Invalid book ID');
      console.error(err.message);
      return callback(err, null);
    }

    // Format date fields
    const formattedBook = {
      ...returnedBook,
      issueDate: formatDate(returnedBook.issueDate),
      returnDate: formatDate(returnedBook.returnDate),
    };

    db.query('INSERT INTO returnedBooks SET ?', formattedBook, (err, results) => {
      if (err) {
        console.error('Error inserting returned book:', err);
        return callback(err, null);
      }

      // Delete from lendBooks after successful insert into returnedBooks
      db.query('DELETE FROM lendBooks WHERE id = ?', [bookId], (err, deleteResults) => {
        if (err) {
          console.error('Error deleting lend book:', err);
          return callback(err, null);
        }
        callback(null, deleteResults);
      });
    });
  },
  deleteLendBook: (bookId, callback) => {
    // Validate bookId
    if (!bookId || bookId === 'undefined') {
      const err = new Error('Invalid book ID');
      console.error(err.message);
      return callback(err, null);
    }

    db.query('DELETE FROM lendBooks WHERE id = ?', [bookId], (err, results) => {
      if (err) {
        console.error('Error deleting lend book:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  updateLendBook: (bookId, updatedBook, callback) => {
    // Validate bookId
    if (!bookId || bookId === 'undefined') {
      const err = new Error('Invalid book ID');
      console.error(err.message);
      return callback(err, null);
    }

    // Format date fields
    const formattedBook = {
      ...updatedBook,
      issueDate: formatDate(updatedBook.issueDate),
      returnDate: formatDate(updatedBook.returnDate),
    };

    db.query('UPDATE lendBooks SET ? WHERE id = ?', [formattedBook, bookId], (err, results) => {
      if (err) {
        console.error('Error updating lend book:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};

module.exports = Reservations;
