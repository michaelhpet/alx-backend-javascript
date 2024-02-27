import readDatabase from '../utils';

const MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(database)
      .then((studentsPerField) => {
        const dataList = ['This is the list of our students'];
        const compareFn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        };
        Object.entries(studentsPerField)
          .sort(compareFn)
          .forEach(([field, students]) => {
            dataList.push(
              `Number of students in ${field}: ${
                students.length
              }. List: ${students.map((s) => s.firstname).join(', ')}`
            );
          });
        const data = dataList.join('\n');
        response.status(200).send(data);
      })
      .catch((error) => {
        response
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const database = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;
    if (!MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(database)
      .then((studentsPerField) => {
        let data = '';
        if (Object.keys(studentsPerField).includes(major)) {
          const students = studentsPerField[major];
          data = `List: ${students.map((s) => s.firstname).join(', ')}`;
        }
        response.status(200).send(data);
      })
      .catch((error) => {
        response
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
