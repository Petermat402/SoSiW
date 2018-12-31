import {EventEmitter, Injectable, Output} from '@angular/core';

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
