const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');

const port = 3000;

// Initialize a new express app.
const app = express();

// Gives express access to the distributable folder.
app.use(express.static(path.join(__dirname, 'dist')));

// Parses text as URLencoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Parses text as JSON
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function() {
  console.log('Server running on localhost:' + port);
});
