const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 1245;

const app = http.createServer();
app.on('request', (_, response) => {
  const data = 'Hello Holberton School!';
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Length', data.length);
  response.statusCode = 200;
  response.write(Buffer.from(data));
});

app.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server listening at http://${HOSTNAME}:${PORT}\n`);
});

module.exports = app;
