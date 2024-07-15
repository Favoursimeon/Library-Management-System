import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    producer: '',
    price: '',
    quantity: '',
    category: '',
    purchaseDate: '',
    genre: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  const handleAddBook = () => {
    setBooks([...books, newBook]);
    setNewBook({
      title: '',
      author: '',
      producer: '',
      price: '',
      quantity: '',
      category: '',
      purchaseDate: '',
      genre: ''
    });
    handleClose();
  };

  const handleDeleteBook = (index) => {
    const newBooks = books.filter((book, i) => i !== index);
    setBooks(newBooks);
  };

  const handleEditBook = (index) => {
    const bookToEdit = books[index];
    setNewBook(bookToEdit);
    handleShow();
    handleDeleteBook(index);
  };

  return (
    <div className="container">
      <Sidebar/>
      <h3>Books Entries</h3>

      <div className="table-container">
      <Button variant="primary" onClick={handleShow} className="my-3">
        <b>Add </b>
      </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Producer</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Purchase Date</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.producer}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>{book.category}</td>
                <td>{book.purchaseDate}</td>
                <td>{book.genre}</td>
                <td>
                  <Button
                    onClick={() => handleEditBook(index)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(index)}
                    
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProducer">
              <Form.Label>Producer</Form.Label>
              <Form.Control
                type="text"
                name="producer"
                value={newBook.producer}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="Currency"
                name="price"
                value={newBook.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={newBook.quantity}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newBook.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPurchaseDate">
              <Form.Label>Purchase Date</Form.Label>
              <Form.Control
                type="date"
                name="purchaseDate"
                value={newBook.purchaseDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={newBook.genre}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBook}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Books;
