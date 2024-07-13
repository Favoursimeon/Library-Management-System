import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a className="navbar-brand" href="/Books">Library Management System</a>
      </div>
      <div className="sidebar-menu">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" style={{ color: '#fff', fontSize:'large' }} className="nav-link" >Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/Books" style={{ color: '#fff', fontSize:'large' }} className="nav-link">Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/Members" style={{ color: '#fff', fontSize:'large' }} className="nav-link">Members</Link>
          </li>
          <li className="nav-item">
            <Link to="/Reservations" style={{ color: '#fff', fontSize:'large' }} className="nav-link">Reservations</Link>
          </li>
          <li className="nav-item">
            <Link to="/Settings" style={{ color: '#fff', fontSize:'large' }} className="nav-link">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
