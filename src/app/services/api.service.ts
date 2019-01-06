import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {backend} from '../../environments/environment';
import * as _ from 'lodash';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {throwError} from 'rxjs';
import {Course} from '../models/course';
import {Grade, GradeBackend} from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string;

  constructor(private httpClient: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError({
        message: 'Something bad happened; please try again later.',
        code: error.status
      }
    );
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders().set('token', _.isNil(this.token) ? '' : this.token).set('Content-Type', 'application/json')
    };
  }

  public login(login: string, password: string) {
    const url = `${backend}/login`;
    return this.httpClient.post(url, {login: login, password: password}, this.httpOptions).pipe(
      tap((response: TokenResponse) => {
        if (response) {
          this.token = response.token;
        }
      }),
      map((object: any) => new User(
        object.user.id,
        object.user.name,
        object.user.surname,
        object.user.pesel,
        object.user.email,
        object.user.group,
        object.user.departament,
        object.user.role
      )),
      catchError(this.handleError)
    );
  }

  public changeEmail(newEmail: string) {
    const url = `${backend}/settings/changeEmail`;
    return this.httpClient.put(url, {email: newEmail}, this.httpOptions).pipe(
      map((object: any) => {
        return {
          message: object.message
        };
      }),
      catchError(this.handleError)
    );
  }

  public changePassword(passwordOld: string, passwordNew: string) {
    const url = `${backend}/settings/changePassword`;
    return this.httpClient.put(url, {passwordOld: passwordOld, passwordNew: passwordNew}, this.httpOptions).pipe(
      map((object: any) => {
        return {
          message: object.message
        };
      }),
      catchError(this.handleError)
    );
  }

  public getColleagues() {
    const url = `${backend}/colleagues?`;
    return this.httpClient.get(url, this.httpOptions).pipe(
      this.mapUsers(),
      catchError(this.handleError)
    );
  }

  public findUsers(searchPhrase: string, category: string) {
    const url = `${backend}/search/${category}/${searchPhrase}?`;
    return this.httpClient.get(url, this.httpOptions).pipe(
      this.mapUsers(),
      catchError(this.handleError)
    );
  }

  public findCourses(searchPhrase: string) {
    const url = `${backend}/search/course/${searchPhrase}`;
    return this.httpClient.get(url, this.httpOptions).pipe(
      map((objects: any) => {
        const courses: Course[] = [];
        _.each(objects, object => {
          courses.push(new Course(
            object.id,
            object.name,
            object.teacherName,
            object.teacherSurname,
            object.department,
            object.email,
            object.academicYear,
            object.semester
          ));
        });
        return courses;
      }),
      catchError(this.handleError)
    );
  }

  public getStudentGrades() {
    const url = `${backend}/grades/student?`;
    return this.httpClient.get(url, this.httpOptions).pipe(
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
      }),
      catchError(this.handleError)
    );
  }

  public getTeacherGrades() {
    const url = `${backend}/grades/teacher?`;
    return this.httpClient.get(url, this.httpOptions).pipe(
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
      }),
      catchError(this.handleError)
    );
  }

  public getAcademicYear() {
    const url = `${backend}/academicYear`;
    return this.httpClient.get(url, this.httpOptions).pipe(
      map((object: any) => {
        return {
          academicYear: object.academicYear
        };
      }),
      catchError(this.handleError)
    );
  }

  public updateGrade(grade) {
    const url = `${backend}/grade`;
    return this.httpClient.put(url, grade, this.httpOptions).pipe(
      map((object: any) => {
        return new GradeBackend(
          object.id_student,
          object.id_course,
          object.term,
          object.value
        );
      }),
      catchError(this.handleError)
    );
  }

  public dropToken() {
    this.token = '';
  }

  private mapUsers() {
    return map((objects: any) => {
      const users: User[] = [];
      _.each(objects, object => {
        users.push(new User(
          object.id,
          object.name,
          object.surname,
          object.pesel,
          object.email,
          object.group,
          object.departament,
          object.role)
        );
      });
      return users;
    });
  }

}

export interface TokenResponse {
  token: string;

}
