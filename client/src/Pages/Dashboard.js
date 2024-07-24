import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Sidebar from './Sidebar';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import './Dashboard.css';

// Register the necessary scales
Chart.register(CategoryScale);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [booksReserved, setBooksReserved] = useState([]);
  const [booksReturned, setBooksReturned] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksReserved = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/lendBooks');
        setBooksReserved(response.data);
      } catch (error) {
        console.error('Error fetching reserved books:', error);
      }
    };

    const fetchBooksReturned = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/returnedBooks');
        setBooksReturned(response.data);
      } catch (error) {
        console.error('Error fetching returned books:', error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/bookTable');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
    fetchBooksReserved();
    fetchBooksReturned();
  }, []);

  const filteredBooksReserved = booksReserved.filter(book =>
    book.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBooksReturned = booksReturned.filter(book =>
    book.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBooks = books.filter(book =>
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reservedData = {
    labels: filteredBooksReserved.map(book => book.member),
    datasets: [
      {
        label: 'Books Reserved',
        data: filteredBooksReserved.map(book => book.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Price',
        data: filteredBooksReserved.map(book => book.price),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const returnedData = {
    labels: filteredBooksReturned.map(book => book.member),
    datasets: [
      {
        label: 'Elapsed Days',
        data: filteredBooksReturned.map(book => book.elapsed),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const bookData = {
    labels: filteredBooks.map(book => book.author),
    datasets: [
      {
        label: 'Price',
        data: filteredBooks.map(book => book.price),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Quantity',
        data: filteredBooks.map(book => book.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="Dashboard">
      <Sidebar />
      <h3>Library Dashboard</h3>
      <div className="search-filter">
        <input
          type="text"
          placeholder={`Search by ${filter === 'books' ? 'author' : 'member'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="reserved">Reserved</option>
          <option value="returned">Returned</option>
          <option value="books">Books</option>
        </select>
      </div>
      {(filter === 'all' || filter === 'reserved') && (
        <div className="chart-container">
          <h3>Books Reserved</h3>
          <Bar data={reservedData} />
        </div>
      )}
      {(filter === 'all' || filter === 'returned') && (
        <div className="chart-container">
          <h3>Books Returned</h3>
          <Bar data={returnedData} />
        </div>
      )}
      {(filter === 'all' || filter === 'books') && (
        <div className="chart-container">
          <h3>Books</h3>
          <Bar data={bookData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
