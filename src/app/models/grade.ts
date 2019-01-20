export class Grade {
  constructor(public studentId: number,
              public teacherName: string,
              public teacherSurname: string,
              public courseName: string,
              public value: number,
              public term: number,
              public academicYear: string,
              public semester: string,
              public courseId: number) {}
}

export class GradeBackend {
  constructor(public studentId: number,
              public courseId: number,
              public term: number,
              public value: number) {}
}
