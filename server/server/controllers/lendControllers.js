const Reservation = require('../models/reservations');

exports.getLendBooks = (req, res) => {
  Reservation.getLendBooks((err, lendBooks) => {
    if (err) res.status(500).json({ error: err.message });
    res.json(lendBooks);
  });
};

exports.getReturnedBooks = (req, res) => {
  Reservation.getReturnedBooks((err, returnedBooks) => {
    if (err) res.status(500).json({ error: err.message });
    res.json(returnedBooks);
  });
};
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('-');
};

exports.addLendBook = (req, res) => {
  const newBook = req.body;
  newBook.issueDate = formatDate(newBook.issueDate);
  newBook.returnDate = formatDate(newBook.returnDate);
  Reservation.addLendBook(newBook, (err, id) => {
    if (err) res.status(500).json({ error: err.message });
    res.json({ id, ...newBook });
  });
};


exports.returnBook = (req, res) => {
  const book = req.body;
  book.issueDate = formatDate(book.issueDate);
  book.returnDate = formatDate(book.returnDate);
  Reservation.returnBook(book, (err, id) => {
    if (err) res.status(500).json({ error: err.message });
    res.json({ id, ...book });
  });
};


exports.deleteLendBook = (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  Reservation.deleteLendBook = (id, callback) => {
    const sql = 'DELETE FROM lendBooks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result.affectedRows);
    });
  };
  
};

// exports.updateLendBook = (req, res) => {
//   const { id } = req.params;
//   const updatedBook = req.body;
  
//   Reservation.updateLendBook(id, updatedBook, (err, affectedRows) => {
//     if (err) res.status(500).json({ error: err.message });
//     res.json({ affectedRows });
//   });
// };

exports.updateLendBook = (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  // Validate updatedBook data
  if (!updatedBook.member || !updatedBook.booktittle || !updatedBook.Author ||
      !updatedBook.issueDate || !updatedBook.returnDate || !updatedBook.price) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }

  Reservation.updateLendBook(id, updatedBook, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book updated successfully' });
  });
};

