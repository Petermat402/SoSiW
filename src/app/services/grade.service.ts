import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Grade, GradeBackend} from '../models/grade';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private apiService: ApiService) {
  }

  getStudentGrades(filterCriteria: {academicYear: string, semester: string}) {
    return this.apiService.getStudentGrades(filterCriteria.academicYear, filterCriteria.semester).pipe(
      map((objects: any) => {
        const grades: Grade[] = [];
        _.each(objects, grade => {
          grades.push(new Grade(
            null,
            grade.teacherName,
            grade.teacherSurname,
            grade.courseName, grade.value,
            grade.term,
            grade.academicYear,
            grade.semester,
            null
          ));
        });
        return grades;
      })
    );
  }

  getTeacherGrades() {
    return this.apiService.getTeacherGrades().pipe(
      map((objects: any) => {
        const grades: Grade[] = [];
        _.each(objects, backedGrades => {
          _.each(backedGrades, grade => {
            grades.push(new Grade(
              grade.studentId,
              grade.teacherName,
              grade.teacherSurname,
              grade.courseName, grade.value,
              grade.term,
              grade.academicYear,
              grade.semester,
              grade.courseId
            ));
          });

        });
        return grades;
      })
    );
  }

  updateGrade(grade) {
    return this.apiService.updateGrade(grade).pipe(
      map((object: any) => {
        return new GradeBackend(
          object.id_student,
          object.id_course,
          object.term,
          object.value
        );
      })
    );
  }

  getAllAcademicYears() {
    return this.apiService.getAllAcademicYears().pipe(
      map((objects: any) => {
        const academicYears: string[] = [];
        _.each(objects, object => {
          academicYears.push(object.academicYear);
        });
        return academicYears;
      })
    );
  }
}
