const db = require('../config/db');

const getAllMembers = (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getMemberById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

const createMember = (req, res) => {
  const { fname, lname, email, phone, address, dob } = req.body;
  const newMember = { fname, lname, email, phone, address, dob }; // Exclude id
  db.query('INSERT INTO members SET ?', newMember, (err, results) => {
    if (err) {
      console.error('Error inserting new member:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: results.insertId, ...newMember });
  });
};



const updateMember = (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  db.query('UPDATE members SET ? WHERE id = ?', [updatedMember, id], (err) => {
    console.error('Error updating member:', err);
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...updatedMember });
  });
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM members WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
