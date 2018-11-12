import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {
  }

  isDarkTheme = true;

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
