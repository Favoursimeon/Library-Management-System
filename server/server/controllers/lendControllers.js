const Reservations = require('../models/reservations');

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

const getLendBooks = (req, res) => {
  Reservations.getLendBooks((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getReturnedBooks = (req, res) => {
  Reservations.getReturnedBooks((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const addLendBook = (req, res) => {
  const newBook = {
    member: req.body.member,
    booktittle: req.body.booktittle, 
    Author: req.body.Author, 
    issueDate: formatDate(req.body.issueDate),
    returnDate: formatDate(req.body.returnDate),
    price: req.body.price,
  };

  Reservations.addLendBook(newBook, (err, results) => {
    if (err) {
      console.error('Error adding lend book:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...newBook });
  });
};

const returnBook = (req, res) => {
  const bookId = req.params.id;
  const returnedBook = {
    ...req.body,
    issueDate: formatDate(req.body.issueDate),
    returnDate: formatDate(req.body.returnDate),
  };

  Reservations.returnBook(bookId, returnedBook, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const deleteLendBook = (req, res) => {
  const bookId = req.params.id;
  Reservations.deleteLendBook(bookId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const updateLendBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = {
    ...req.body,
    issueDate: formatDate(req.body.issueDate),
    returnDate: formatDate(req.body.returnDate),
  };

  Reservations.updateLendBook(bookId, updatedBook, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

module.exports = {
  getLendBooks,
  getReturnedBooks,
  addLendBook,
  returnBook,
  deleteLendBook,
  updateLendBook,
};
