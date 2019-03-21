const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
});

// Add department's data to the database
router.post('/', urlencodedParser, (req, res) => {
    const query = 'INSERT INTO departments(name) VALUES (?)';
    const names = [req.body.inputName];

    connection.query(query, names, (err, result) => {
        if (err) throw err.message;
        res.redirect("/");
    });
});

// Remove department's data from the database
router.post('/delete', urlencodedParser, (req, res) => {
    const query = 'DELETE FROM departments WHERE departments.id = ?';
    const deleteButton = req.body.deleteDep;

    connection.query(query, deleteButton, (err, result) => {
        if (err) throw err.message;
        res.redirect('/');
    })
});

// Update department's data
router.post('/update', urlencodedParser, (req, res) => {
    const query = 'UPDATE departments SET departments.name = ? WHERE departments.id = ?';
    const editButton = [req.body.editName, req.body.editDep];

    connection.query(query, editButton, (err, result) => {
        if (err) throw err.message;
        res.redirect('/');
    })
});

router.get("/", (req, res) => {
    const query = 'SELECT * FROM departments';

    connection.query(query, (err, result) => {
        if (err) throw err.message;
        res.render('index', {
            departments: result,
            title: 'Departments page'
        })
    });
});

// Redirect to Adding page
router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add a department',
    })
});

module.exports = router;