const Book = require('../models/books');

exports.getAllBooks = (req, res) => {
  Book.getAllBooks((err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: err });
    }
    return res.json(books);
  });
};

exports.addBook = (req, res) => {
  const newBook = req.body;
  console.log('Adding new book:', newBook);  // Log the incoming book data
  Book.addBook(newBook, (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      return res.status(500).json({ error: err });
    }
    return res.json({ message: 'Book added successfully', id: result.insertId });
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  console.log('Deleting book with id:', id); 
  Book.deleteBook(id, (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).json({ error: err });
    }
    return res.json({ message: 'Book deleted successfully' });
  });
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;
  console.log('Updating book with id:', id, 'to:', updatedBook);  
  Book.updateBook(id, updatedBook, (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).json({ error: err });
    }
    return res.json({ message: 'Book updated successfully' });
  });
};
