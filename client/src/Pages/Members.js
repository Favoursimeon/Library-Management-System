import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';

const Members = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newEntry, setNewEntry] = useState({
    id: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
  });

  const handleShowModal = (edit = false, id = null) => {
    setEditMode(edit);
    if (edit) {
      const entryToEdit = data.find((entry) => entry.id === id);
      setNewEntry(entryToEdit);
      setCurrentId(id);
    } else {
      setNewEntry({
        id: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
      });
    }
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleAddEntry = () => {
    if (editMode) {
      setData(
        data.map((entry) =>
          entry.id === currentId ? { ...newEntry, id: currentId } : entry
        )
      );
    } else {
      setData([...data, { ...newEntry, id: data.length + 1 }]);
    }
    setNewEntry({
      id: '',
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
    });
    setShowModal(false);
    setEditMode(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((entry) => entry.id !== id));
  };

  return (
    <div className="Members">
      <Sidebar />
      <h3>Members</h3>
      <Button variant="primary" onClick={() => handleShowModal(false)}>
        Add 
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Address</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.fname}</td>
              <td>{entry.lname}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.address}</td>
              <td>{entry.dob}</td>
              <td>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleShowModal(true, entry.id)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(entry.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Member' : 'Add Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={newEntry.fname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={newEntry.lname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newEntry.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                value={newEntry.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newEntry.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDOB">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={newEntry.dob}
                onChange={handleChange}
              />
            </Form.Group>
            <Button  onClick={handleAddEntry}>
              {editMode ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Members;
