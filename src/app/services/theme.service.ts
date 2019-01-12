import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() {
  }

  isDarkTheme = true;
  private themeSource = new BehaviorSubject<boolean>(true);
  themeSrc$ = this.themeSource.asObservable();

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeSource.next(this.isDarkTheme);
  }
}
