import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {backend} from '../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  private static get httpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('token', _.isNil(token) ? '' : token).set('Content-Type', 'application/json')
    };
  }

  public validateToken(token: string) {
    const url = `${backend}/token/validate`;
    return this.httpClient.get(url, {headers: new HttpHeaders().set('token', token)});
  }

  public login(login: string, password: string) {
    const url = `${backend}/login`;
    return this.httpClient.post(url, {login: login, password: password}, ApiService.httpOptions);
  }

  public changeEmail(newEmail: string) {
    const url = `${backend}/settings/changeEmail`;
    return this.httpClient.put(url, {email: newEmail}, ApiService.httpOptions);
  }

  public changePassword(passwordOld: string, passwordNew: string) {
    const url = `${backend}/settings/changePassword`;
    return this.httpClient.put(url, {passwordOld: passwordOld, passwordNew: passwordNew}, ApiService.httpOptions);
  }

  public getColleagues() {
    const url = `${backend}/colleagues?`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public findUsers(searchPhrase: string, category: string) {
    const url = `${backend}/search/${category}/${searchPhrase}?`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public findCourses(searchPhrase: string) {
    const url = `${backend}/search/course/${searchPhrase}`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public getStudentGrades() {
    const url = `${backend}/grades/student?`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public getTeacherGrades() {
    const url = `${backend}/grades/teacher?`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public getAcademicYear() {
    const url = `${backend}/academicYear`;
    return this.httpClient.get(url, ApiService.httpOptions);
  }

  public updateGrade(grade) {
    const url = `${backend}/grade`;
    return this.httpClient.put(url, grade, ApiService.httpOptions);
  }
}

export interface TokenResponse {
  token: string;

}
