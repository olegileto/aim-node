const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connector/db');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addWorker', urlencodedParser, (req, res) => {
    const query = 'INSERT INTO workers(name, mail, salary, date) VALUES (?, ?, ?, ?)';
    const rows = [req.body.workerName, req.body.workerEmail, req.body.workerSalary, req.body.workerDate];

    // Validation
    if (req.body.workerEmail.indexOf('@') < 0 || req.body.workerEmail.indexOf('.') < 0) {
        res.render('add-worker', {
            title: "Add a worker",
            mailValidation: true,
            errorMessage: 'Invalid email. example@gmail.com'
        });
    } else {
        connection.query(query, rows, (err) => {
            if (err) throw err;
            res.redirect('/workers');
        });
    }
});

router.post('/deleteWorker', urlencodedParser, (req, res) => {
    const query = 'DELETE FROM workers WHERE workers.id = ?';
    const deleteButton = req.body.deleteWorker;

    connection.query(query, deleteButton, (err) => {
        if (err) throw err.message;
        res.redirect('/workers');
    });
});

router.post('/updateWorker', urlencodedParser, (req, res) => {
    const query = 'UPDATE workers SET workers.name = ?, workers.mail = ?, workers.salary = ?, workers.date = ? WHERE  workers.id = ?';
    const rows = [req.body.editName, req.body.editEmail, req.body.editSalary, req.body.editDate, req.body.editWorker];

    connection.query(query, rows, (err) => {
        if (err) throw err.message;
        res.redirect('/workers');
    });
});
router.get('/workers', (req, res) => {
    const query = 'SELECT * FROM workers';

    connection.query(query, (err, result) => {
        if (err) throw err.message;
        res.render('workers', {
            workers: result,
            title: 'Workers'
        })
    })
});

router.get('/add-worker', (req, res) => {
    res.render('add-worker', {
        title: "Add a worker",
        mailValidation: false,
        errorMessage: null
    })
});

module.exports = router;
