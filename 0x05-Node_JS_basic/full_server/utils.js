import fs from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) reject(new Error('Cannot load the database'));
      if (data) {
        const content = data.toString('utf-8');
        const lines = content.trim().split('\n');
        const header = lines[0].split(',');
        const fieldColumnIndex = header.findIndex(
          (item) => item.toLowerCase() === 'field',
        );
        const nameColumnIndex = header.findIndex(
          (item) => item.toLowerCase() === 'firstname',
        );
        const rows = lines.slice(1).map((row) => row.split(','));
        const studentsPerField = rows.reduce((_fields, student) => {
          const fields = _fields;
          if (fields[student[fieldColumnIndex]]) return fields;
          fields[student[fieldColumnIndex]] = rows
            .filter(
              (item) => item[fieldColumnIndex] === student[fieldColumnIndex],
            )
            .map((item) => ({
              [header[nameColumnIndex]]: item[nameColumnIndex],
            }));
          return fields;
        }, {});
        const students = studentsPerField;
        resolve(students);
      }
    });
  });
}

export default readDatabase;
module.exports = readDatabase;
