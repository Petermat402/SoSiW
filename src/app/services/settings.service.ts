import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private apiService: ApiService) {
  }

  changePassword(passwordOld: string, passwordNew: string) {
    return this.apiService.changePassword(passwordOld, passwordNew).pipe(
      map((object: any) => {
        const user = LocalStorageService.getUser();
        user.email = object.email;
        LocalStorageService.setUser(user);
        return {
          message: object.message
        };
      })
    );
  }

  changeEmail(newEmail: string) {
    return this.apiService.changeEmail(newEmail).pipe(
      map((object: any) => {
        return {
          message: object.message
        };
      })
    );
  }
}
