const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});

// MySQL connection
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1111",
    database: "node-schema"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});


// Add a department to the database
app.post('/', urlencodedParser, (req, res) => {
    const query = 'INSERT INTO departments(name) VALUES (?)';
    const names = [req.body.inputName];

    connection.query(query, names, (err, result) => {
        if (err) throw err.message;
        res.redirect("/");
    });
});

// Delete a department from the database
app.post('/delete', urlencodedParser, (req, res) => {
    const queryDelete = 'DELETE FROM departments WHERE departments.id = ?';
    const button = req.body.deleteid;

    connection.query(queryDelete, button, (err, result) => {
        if (err) throw err.message;
        res.redirect('/');
    })
});

// Set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    const query = 'SELECT * from departments';

    connection.query(query, (err, result) => {
        if (err) throw err.message;
        res.render('index', {
            departments: result,
            title: 'Departments page'
        })
    });
});

// Redirect to Adding page
app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add a department',
        message: 'Hi. This is Adding page'
    })
});

app.listen(port, (err) => err ? console.log(`Something is wrong ${err.message}`) : console.log(`Listening on port ${port}`));
