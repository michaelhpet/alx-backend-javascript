export default function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter((s) => s.location === city)
    .map((s) => ({
      ...s,
      grade: (newGrades.find((g) => g.studentId === s.id) || {}).grade || 'N/A',
    }));
}
