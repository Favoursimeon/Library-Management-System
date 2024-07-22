const db = require ('../config/db');

const Member = {};

Member.getAllMembers = (callback) => {
    db.query('SELECT * FROM members', (err, results) => {
        if (err) {
        return callback(err, null);
        }
        return callback(null, results);
    });
    };
Member.getMemberById = (id, callback) => {
    db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
        if (err) {
        return callback(err, null);
        }
        return callback(null, results);
    });
    }
Member.createMember = (member, callback) => {
    const { fname, lname, email, phone, address, dob } = member;
    db.query('INSERT INTO members (fname, lname, email, phone, address, dob) VALUES (?, ?, ?, ?, ?, ?)', 
    [fname, lname, email, phone, address, dob], (err, results) => {
        if (err) {
        return callback(err, null);
        }
        return callback(null, results);
    });
    }
Member.updateMember = (member, callback) => {
    const { id, fname, lname, email, phone, address, dob } = member;
    db.query('UPDATE members SET fname = ?, lname = ?, email = ?, phone = ?, address = ?, dob = ? WHERE id = ?', 
    [fname, lname, email, phone, address, dob, id], (err, results) => {
        if (err) {
        return callback(err, null);
        }
        return callback(null, results);
    });
    }
Member.deleteMember = (id, callback) => {
    db.query('DELETE FROM members WHERE id = ?', [id], (err, results) => {
        if (err) {
        return callback(err, null);
        }
        return callback(null, results);
    });
    }
    