import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import 'react-tabs/style/react-tabs.css';
import './Reservations.css';

Modal.setAppElement('#root');

const Reservations = () => {
  const [lendBooks, setLendBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    member: '',
    booktittle: '',
    Author: '',
    issueDate: '',
    returnDate: '',
    price: '',
  });
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    fetchLendBooks();
    fetchReturnedBooks();
  }, []);

  const fetchLendBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/lendBooks');
      if (Array.isArray(response.data)) {
        setLendBooks(response.data);
      } else {
        console.error('Unexpected response data:', response.data);
        setLendBooks([]);
      }
    } catch (error) {
      console.error('Error fetching lend books:', error);
      setLendBooks([]);
    }
  };

  const fetchReturnedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/returnedBooks');
      if (Array.isArray(response.data)) {
        setReturnedBooks(response.data);
      } else {
        console.error('Unexpected response data:', response.data);
        setReturnedBooks([]);
      }
    } catch (error) {
      console.error('Error fetching returned books:', error);
      setReturnedBooks([]);
    }
  };

  const handleReturn = async (index) => {
    const bookToReturn = lendBooks[index];
    const elapse = calculateElapse(bookToReturn.issueDate, bookToReturn.returnDate);
    const fine = calculateFine(elapse);

    try {
      await axios.post('http://localhost:5000/api/books/returnedBooks', {
        ...bookToReturn,
        elapse,
        fine,
      });
      await axios.delete(`http://localhost:5000/api/books/lendBooks/${bookToReturn.id}`);
      fetchLendBooks();
      fetchReturnedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
    }

    const updatedLendBooks = lendBooks.filter((_, i) => i !== index);
    setLendBooks(updatedLendBooks);

    setReturnedBooks([...returnedBooks, { ...bookToReturn, elapse, fine }]);
  };

  const handleEdit = (index) => {
    setCurrentEditIndex(index);
    setNewBook(lendBooks[index]);
    setIsEditModalOpen(true);
  };

  // const handleDelete = async (index) => {
  //   const updatedLendBooks = lendBooks.filter((_, i) => i !== index);
  //   const bookToDelete = lendBooks[index];
  //   setLendBooks(updatedLendBooks);

  //   try {
  //     await axios.delete(`http://localhost:5000/api/books/lendBooks/${bookToDelete.id}`);
  //     fetchLendBooks();
  //   } catch (error) {
  //     console.error('Error deleting book:', error);
  //   }
  // };

  const handleDelete = async (index) => {
    const bookToDelete = lendBooks[index];
    
    try {
      await axios.delete(`http://localhost:5000/api/books/lendBooks/${bookToDelete.id}`);
      fetchLendBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
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


  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };
  

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books/lendBooks', {
        member: newBook.member,
        booktittle: newBook.booktittle,
        Author: newBook.Author,
        issueDate: formatDate(newBook.issueDate),
        returnDate: formatDate(newBook.returnDate),
        price: newBook.price,
      });
      fetchLendBooks();
      setNewBook({
        member: '',
        booktittle: '',
        Author: '',
        issueDate: '',
        returnDate: '',
        price: '',
      });
      closeAddModal();
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  };
  

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.put(`http://localhost:5000/api/books/lendBooks/${newBook.id}`, newBook);
  //     fetchLendBooks();
  //     closeEditModal();
  //   } catch (error) {
  //     console.error('Error editing book:', error);
  //   }

  //   const updatedLendBooks = lendBooks.map((book, i) =>
  //     i === currentEditIndex ? newBook : book
  //   );
  //   setLendBooks(updatedLendBooks);
  //   closeEditModal();
  // };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (currentEditIndex === null) {
      console.error('No book is selected for editing');
      return;
    }
  
    const bookToUpdate = { ...newBook, id: lendBooks[currentEditIndex].id };
  
    try {
      await axios.put(`http://localhost:5000/api/books/lendBooks/${bookToUpdate.id}`, bookToUpdate);
      fetchLendBooks();
      closeEditModal();
    } catch (error) {
      console.error('Error editing book:', error.response ? error.response.data : error.message);
    }
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
                  <td>{book.booktittle}</td>
                  <td>{book.Author}</td>
                  <td>{book.issueDate}</td>
                  <td>{book.returnDate}</td>
                  <td>{book.price}</td>
                  <td>
                    <button onClick={() => handleReturn(index)}>Return</button>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button variant="danger" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
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
                  <td>{book.booktittle}</td>
                  <td>{book.Author}</td>
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
              name="booktittle"
              value={newBook.booktittle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="Author"
              value={newBook.Author}
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
              type="text"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Book</button>
          <button onClick={closeAddModal}>Cancel</button>
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
              name="booktittle"
              value={newBook.booktittle}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="Author"
              value={newBook.Author}
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
              type="text"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Update Book</button>
          <button onClick={closeEditModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Reservations;