import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User;

  constructor(private apiService: ApiService) {
  }

  login(login: string, password: string) {
    const basePassword = btoa(password);
    return this.apiService.login(login, basePassword);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
