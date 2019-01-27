import {Injectable} from '@angular/core';
import {ApiService, TokenResponse} from './api.service';
import {User} from '../models/user';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService,
              private errorService: ErrorService) {
  }

  login(login: string, password: string): Observable<User> {
    const basePassword = btoa(password);
    return this.apiService.login(login, basePassword).pipe(
      tap((response: TokenResponse) => {
        if (response) {
          LocalStorageService.setToken(response.token);
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
        object.user.role,
        object.user.language,
        object.user.reminder
      ))
    );
  }

  setAcademicYear() {
    this.apiService.getAcademicYear().pipe(map((object: any) => {
      return {
        academicYear: object.academicYear
    };
    })).subscribe(object => {
        LocalStorageService.setAcademicYear(object.academicYear);
      },
      err => this.errorService.handleError(err));
  }

  validateToken(token: string): Observable<User> {
    return this.apiService.validateToken(token).pipe(
      tap((response: TokenResponse) => {
        if (response) {
          LocalStorageService.setToken(response.token);
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
        object.user.role,
        object.user.language,
        object.user.reminder
      ))
    );
  }
}
