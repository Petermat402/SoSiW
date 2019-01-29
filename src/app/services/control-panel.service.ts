import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ControlPanelService {

  constructor(private apiService: ApiService,
              private errorService: ErrorService) {
  }

  checkUsername(username: string) {
    return this.apiService.checkUsername(username);
  }

  sendRegisterUser(newUser) {
    newUser.password = btoa(newUser.password);
    newUser.language = newUser.language.toLowerCase();
    return this.apiService.postRegister(newUser);
  }
}
