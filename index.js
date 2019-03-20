const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

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

app.get('/selectall', (req, res) => {
    const selectAll  = 'SELECT * FROM workers';
    connection.query(selectAll, (err, result) => {
        if (err) { console.log(err); }
        console.log(result);
        res.send('Selected all...');
    });

    connection.end();
});

app.listen(port, (err) => err ? console.log(`Something is wrong ${err.message}`) : console.log(`Listening on port ${port}`));