const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connector/db');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/addWorker', urlencodedParser, (req, res) => {
    const queryInsert = 'INSERT INTO workers(name, mail, salary, date) VALUES (?, ?, ?, ?)';
    const queryMail = 'SELECT mail FROM workers';
    const rows = [req.body.workerName, req.body.workerEmail, req.body.workerSalary, req.body.workerDate];
    let errMail = false;

    // Validation
    connection.query(queryMail, (err, result) => {
        if (err) throw err;
        result.forEach(res => {
            if (req.body.workerEmail === res.mail) {
                errMail = true;
            }
        });

        if (errMail) {
            res.render('add-worker', {
                title: "Add a worker",
                mailValidation: true,
                errorMessage: 'Mail should be unique'
            });
        } else {
            connection.query(queryInsert, rows, (err) => {
                if (err) throw err;
                res.redirect('/workers');
            });
        }
    })

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
