const express = require('express');
const app = express();
const port = 3000;

const departments = require('./routes/departmetns');

// Set the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(departments);

app.listen(port, (err) => err ? console.log(`Something is wrong ${err.message}`) : console.log(`Listening on port ${port}`));
