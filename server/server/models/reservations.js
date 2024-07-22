const db = require('../config/db');

const Reservation = {};

Reservation.getLendBooks = (callback) => {
  const sql = 'SELECT * FROM lendBooks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(null, results);
  });
};

Reservation.getReturnedBooks = (callback) => {
  const sql = 'SELECT * FROM returnedBooks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(null, results);
  });
};

Reservation.addLendBook = (newBook, callback) => {
  const sql = 'INSERT INTO lendBooks SET ?';
  db.query(sql, newBook, (err, result) => {
    if (err) throw err;
    callback(null, result.insertId);
  });
};

Reservation.returnBook = (book, callback) => {
  const sql = 'INSERT INTO returnedBooks SET ?';
  db.query(sql, book, (err, result) => {
    if (err) throw err;
    callback(null, result.insertId);
  });
};

Reservation.deleteLendBook = (id, callback) => {
  const sql = 'DELETE FROM lendBooks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    callback(null, result.affectedRows);
  });
};

Reservation.updateLendBook = (id, book, callback) => {
  const sql = `UPDATE lendBooks SET 
    member = ?, 
    booktittle = ?, 
    Author = ?, 
    issueDate = ?, 
    returnDate = ?, 
    price = ? 
    WHERE id = ?`;

  const values = [
    book.member,
    book.booktittle,
    book.Author,
    book.issueDate,
    book.returnDate,
    book.price,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};


module.exports = Reservation;
