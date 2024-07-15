import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import 'react-tabs/style/react-tabs.css';
import './Reservations.css';

Modal.setAppElement('#root');

const Reservations = () => {
  const [lendBooks, setLendBooks] = useState([
    {
      // member: 'John Doe',
      // bookTitle: 'Book 1',
      // author: 'Author 1',
      // issueDate: '2023-07-01',
      // returnDate: '2023-07-10',
      // price: '$10',
    },
    // Add more books here
  ]);

  const [returnedBooks, setReturnedBooks] = useState([
    {
      // member: 'Jane Smith',
      // bookTitle: 'Book 2',
      // author: 'Author 2',
      // issueDate: '2023-06-01',
      // elapse: '30 days',
      // returnDate: '2023-07-01',
      // fine: '$5',
    },
    // Add more books here
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    member: '',
    bookTitle: '',
    author: '',
    issueDate: '',
    returnDate: '',
    price: '',
  });
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handleReturn = (index) => {
    const bookToReturn = lendBooks[index];
    const elapse = calculateElapse(bookToReturn.issueDate, bookToReturn.returnDate);
    const fine = calculateFine(elapse);

    const updatedLendBooks = lendBooks.filter((_, i) => i !== index);
    setLendBooks(updatedLendBooks);

    setReturnedBooks([
      ...returnedBooks,
      { ...bookToReturn, elapse, fine }
    ]);
  };

  const handleEdit = (index) => {
    setCurrentEditIndex(index);
    setNewBook(lendBooks[index]);
    setIsEditModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedLendBooks = lendBooks.filter((_, i) => i !== index);
    setLendBooks(updatedLendBooks);
  };

  const calculateElapse = (issueDate, returnDate) => {
    const issue = new Date(issueDate);
    const returnD = new Date(returnDate);
    const elapse = Math.ceil((returnD - issue) / (1000 * 60 * 60 * 24)); //elapse calculation
    return `${elapse} days`;
  };

  const calculateFine = (elapse) => {
    const days = parseInt(elapse.split(' ')[0], 10);
    return days > 30 ? `$${(days - 30) * 1}` : '$0'; // fine calculation
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setLendBooks([...lendBooks, newBook]);
    setNewBook({
      // member: '',
      // bookTitle: '',
      // author: '',
      // issueDate: '',
      // returnDate: '',
      // price: '',
    });
    closeAddModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedLendBooks = lendBooks.map((book, i) =>
      i === currentEditIndex ? newBook : book
    );
    setLendBooks(updatedLendBooks);
    closeEditModal();
  };

  return (
    <div className="App">
      <Sidebar />
      <Tabs>
        <TabList>
          <Tab>Lend Book</Tab>
          <Tab>Returned Book</Tab>
        </TabList>

        <TabPanel>
          <h3>Lend Book</h3>
          <button onClick={openAddModal}>Add</button>
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Return Date</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lendBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.member}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.author}</td>
                  <td>{book.issueDate}</td>
                  <td>{book.returnDate}</td>
                  <td>{book.price}</td>
                  <td>
                    <button onClick={() => handleReturn(index)}>Return</button>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button 
                    variant="danger"
                    onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h3>Returned Book</h3>
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Elapsed</th>
                <th>Return Date</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {returnedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.member}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.author}</td>
                  <td>{book.issueDate}</td>
                  <td>{book.elapse}</td>
                  <td>{book.returnDate}</td>
                  <td>{book.fine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>
      </Tabs>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Book Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddSubmit}>
          <label>
            Member:
            <input
              type="text"
              name="member"
              value={newBook.member}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Book Title:
            <input
              type="text"
              name="bookTitle"
              value={newBook.bookTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Issue Date:
            <input
              type="date"
              name="issueDate"
              value={newBook.issueDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Return Date:
            <input
              type="date"
              name="returnDate"
              value={newBook.returnDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="Currency"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={closeAddModal}>Cancel</button>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Book Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Edit Book</h2>
        <form onSubmit={handleEditSubmit}>
          <label>
            Member:
            <input
              type="text"
              name="member"
              value={newBook.member}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Book Title:
            <input
              type="text"
              name="bookTitle"
              value={newBook.bookTitle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Issue Date:
            <input
              type="date"
              name="issueDate"
              value={newBook.issueDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Return Date:
            <input
              type="date"
              name="returnDate"
              value={newBook.returnDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="Currency"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Edit Book</button>
          <button type="button" onClick={closeEditModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Reservations;
