const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connector/db');

const urlencodedParser = bodyParser.urlencoded({extended: false});

// Add department's data to the database
router.post('/', urlencodedParser, (req, res) => {
    const query = 'INSERT INTO departments(name) VALUES (?)';
    const names = req.body.inputName;

    // Validation
    if (req.body.inputName.length === 0) {
        res.render('add', {
            title: 'Add a department',
            nameValidation: true,
            errorMessage: "The field shouldn't be empty"
        })
    } else {
        connection.query(query, names, (err) => {
            if (err) throw err.message;
            res.redirect("/");
        });
    }
});

// Remove department's data from the database
router.post('/delete', urlencodedParser, (req, res) => {
    const query = 'DELETE FROM departments WHERE departments.id = ?';
    const deleteButton = req.body.deleteDep;

    connection.query(query, deleteButton, (err) => {
        if (err) throw err.message;
        res.redirect('/');
    })
});

// Update department's data
router.post('/update', urlencodedParser, (req, res) => {
    const query = 'UPDATE departments SET departments.name = ? WHERE departments.id = ?';
    const editButton = [req.body.editName, req.body.editDep];

    connection.query(query, editButton, (err) => {
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
            title: 'Departments page',
        })
    });
});

// Redirect to Adding page
router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add a department',
        nameValidation: false,
        errorMessage: null
    })
});

module.exports = router;