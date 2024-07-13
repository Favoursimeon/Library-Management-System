const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const app = express();
const port = 5000;
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Library'
});

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// app.use('/api/auth/login', require('./routes/login'));
// app.use('/api/auth/register', require('./routes/register'));
// // Define your routes here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});