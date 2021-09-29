/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const router = require('./routes.js');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.static('client/public'));

app.use('/api', router);

app.get('*', (req, res) => {
  // res.send('Hello from the server!');
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
  // app.use(express.static('client/public'));
});
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
