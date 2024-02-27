const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 1245;

const server = http.createServer();
server.on('request', (_, response) => {
  const data = 'Hello Holberton School!';
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Length', data.length);
  response.statusCode = 200;
  response.write(Buffer.from(data));
});

server.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server listening at http://${HOSTNAME}:${PORT}\n`);
});

module.exports = server;
