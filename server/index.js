const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = require('./routes.js'); // router imported here
// const path = require('path');

const PORT = 5000;
const app = express();

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'qa'
});

// app.use(express.json());

app.use('/', router);
// app.use(express.static('client/public'));

// app.use('/api', router);

// app.get('*', (req, res) => {
//   res.send('Hello from the server!');
  // res.sendFile(path.join(__dirname, '../client/public/index.html'));
  // app.use(express.static('client/public'));
// });
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
