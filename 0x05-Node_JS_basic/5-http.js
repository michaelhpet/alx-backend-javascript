const fs = require('fs');
const http = require('http');

const HOSTNAME = 'localhost';
const PORT = 1245;

const app = http.createServer();
app.on('request', (request, response) => {
  if (request.url === '/') {
    const data = 'Hello Holberton School!';
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Content-Length', data.length);
    response.statusCode = 200;
    response.write(Buffer.from(data));
  } else if (request.url === '/students') {
    const database = process.argv.length > 2 ? process.argv[2] : '';
    const dataList = ['This is the list of our students'];
    countStudents(database)
      .then((results) => {
        dataList.push(...results);
        const data = dataList.join('\n');
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Length', data.length);
        response.statusCode = 200;
        response.write(Buffer.from(data));
      })
      .catch((error) => {
        dataList.push(
          error instanceof Error ? error.message : error.toString()
        );
        const data = dataList.join('\n');
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Length', data.length);
        response.statusCode = 200;
        response.write(Buffer.from(data));
      });
  }
});

app.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server listening at http://${HOSTNAME}:${PORT}\n`);
});

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) reject(new Error('Cannot load the database'));
      if (data) {
        const content = data.toString('utf-8');
        const lines = content.trim().split('\n');
        const header = lines[0].split(',');
        const fieldColumnIndex = header.findIndex(
          (item) => item.toLowerCase() === 'field'
        );
        const nameColumnIndex = header.findIndex(
          (item) => item.toLowerCase() === 'firstname'
        );
        const rows = lines.slice(1).map((row) => row.split(','));
        const totalStudents = rows.length;
        const studentsPerField = rows.reduce((_fields, student) => {
          const fields = _fields;
          if (fields[student[fieldColumnIndex]]) return fields;
          fields[student[fieldColumnIndex]] = rows.filter(
            (item) => item[fieldColumnIndex] === student[fieldColumnIndex]
          );
          return fields;
        }, {});
        const result = [`Number of students: ${totalStudents}`];
        Object.entries(studentsPerField).forEach(([field, students]) => {
          result.push(
            `Number of students in ${field}: ${
              students.length
            }. List: ${students.map((s) => s[nameColumnIndex]).join(', ')}`
          );
        });
        resolve(result);
      }
    });
  });
}
