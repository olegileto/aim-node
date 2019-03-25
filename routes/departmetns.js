const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connector/db');

const urlencodedParser = bodyParser.urlencoded({extended: false});

// Add department's data to the database
router.post('/', urlencodedParser, (req, res) => {
    const queryInsert = 'INSERT INTO departments(name) VALUES (?)';
    const queryName = 'SELECT name FROM departments';
    const names = req.body.inputName;
    let errName = false;

    // Validation
    connection.query(queryName, (err, result) => {
        if (err) throw err;
        result.forEach(res => {
            if (req.body.inputName === res.name) {
                errName = true;
            }
        });

        if (errName) {
            res.render('add', {
                title: 'Add a department',
                nameValidation: true,
                errorMessage: "Name should be unique"
            })
        } else {
            connection.query(queryInsert, names, (err) => {
                if (err) throw err.message;
                res.redirect("/");
            });
        }
    });
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
    const queryUpdate = 'UPDATE departments SET departments.name = ? WHERE departments.id = ?';
    const editButton = [req.body.editName, req.body.editDep];

    connection.query(queryUpdate, editButton, (err) => {
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