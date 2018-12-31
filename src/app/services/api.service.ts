import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {backend} from '../../environments/environment';
import * as _ from 'lodash';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {throwError} from 'rxjs';

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
        console.log(response.token);
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

  public dropToken() {
    this.token = '';
  }

}

export interface TokenResponse {
  token: string;

}
