const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.write('Hello');
   res.end();
});

app.listen(port, (err) => err ? console.log(`Something is wrong ${err.message}`) : console.log(`Listening on port ${port}`));