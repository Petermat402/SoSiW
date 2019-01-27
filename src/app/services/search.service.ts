import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import * as _ from 'lodash';
import {Course} from '../models/course';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {
  }

  findUsers(searchPhrase: string, category: string) {
    return this.apiService.findUsers(searchPhrase, category).pipe(
      this.mapUsers()
    );
  }

  findCourses(searchPhrase: string) {
    return this.apiService.findCourses(searchPhrase).pipe(
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
      })
    );
  }

  getColleagues() {
    return this.apiService.getColleagues().pipe(
      this.mapUsers()
    );
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
          object.role,
          object.language,
          false)
        );
      });
      return users;
    });
  }

}
