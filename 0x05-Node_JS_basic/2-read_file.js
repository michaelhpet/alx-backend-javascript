const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) throw new Error('Cannot load the database');
  if (!fs.statSync(path).isFile()) throw new Error('Cannot load the database');
  const content = fs.readFileSync(path, 'utf-8');
  const lines = content.trim().split('\n');
  const header = lines[0].split(',');
  const fieldColumnIndex = header.findIndex(
    (item) => item.toLowerCase() === 'field',
  );
  const nameColumnIndex = header.findIndex(
    (item) => item.toLowerCase() === 'firstname',
  );
  const rows = lines.slice(1).map((row) => row.split(','));
  const totalStudents = rows.length;
  const studentsPerField = rows.reduce((_fields, student) => {
    const fields = _fields;
    if (fields[student[fieldColumnIndex]]) return fields;
    fields[student[fieldColumnIndex]] = rows.filter(
      (item) => item[fieldColumnIndex] === student[fieldColumnIndex],
    );
    return fields;
  }, {});
  console.log(`Number of students: ${totalStudents}`);
  Object.entries(studentsPerField).forEach(([field, students]) => {
    console.log(
      `Number of students in ${field}: ${students.length}. List: ${students
        .map((s) => s[nameColumnIndex])
        .join(', ')}`,
    );
  });
}

module.exports = countStudents;
