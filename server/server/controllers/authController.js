const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.  register = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Email: ", email);
    const user = await users.create(email, password);
    console.log("users: ", user);

    // if (!users) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
    //   expiresIn: '1h',
    // });


    res.status(201).json({ message: 'users registered successfully' });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: 'Error registering users', error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findByEmail(email);
    console.log("users: ", user);
    if (!users) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};
