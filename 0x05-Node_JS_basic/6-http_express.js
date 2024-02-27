const express = require('express');

const HOSTNAME = 'localhost';
const PORT = 1245;

const app = express();

app.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});

app.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server listening at http://${HOSTNAME}:${PORT}\n`);
});

module.exports = app;
