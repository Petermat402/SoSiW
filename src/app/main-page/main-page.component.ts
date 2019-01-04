import {Component, ElementRef, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {User} from '../models/user';
import {LanguageService} from '../services/language.service';
import {LoginService} from '../services/login.service';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private elementRef: ElementRef,
              private themeService: ThemeService,
              private languageService: LanguageService,
              private loginService: LoginService,
              private apiService: ApiService,
              private router: Router) {
  }

  darkTheme = this.themeService.isDarkTheme;
  user: User;
  users: User[];
  messages;

  showSettingsComponent = false;
  showGradesComponent = false;
  showColleaguesComponent = false;
  showEmailComponent = false;
  showAccountComponent = false;
  showSearchCourseComponent = false;

  searchCategory = 'student';

  ngOnInit() {
    this.updateLanguage();
    this.user = this.loginService.getUser();
  }

  updateTheme() {
    this.themeService.changeTheme();
    this.darkTheme = this.themeService.isDarkTheme;
    this.setBackground();
  }

  private setBackground() {
    if (this.themeService.isDarkTheme) {
      this.elementRef
        .nativeElement
        .ownerDocument
        .body
        .style
        .backgroundImage = 'radial-gradient(circle, #a60505, #800117, #580a1b, #2f0d15, #210404, #000000)';
    } else {
      this.elementRef
        .nativeElement
        .ownerDocument
        .body
        .style
        .backgroundImage = 'radial-gradient(circle, #131fae, #4c4bc2, #7474d5, #9c9ee4, #c5c8f2)';
    }
  }

  updateLanguage() {
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  logout() {
    this.user = null;
    this.loginService.setUser(null);
    this.apiService.dropToken();
    this.router.navigate(['/login']);
  }

  showGrades() {
  }

  showEmail() {
  }

  showAccountInfo() {
    this.setComponentsVisibility(false, false, false, !this.showAccountComponent, false);
  }

  showColleagues() {
    if (!this.showColleaguesComponent) {
      this.apiService.getColleagues().subscribe(users => {
          if (users) {
            this.users = users;
          }
        },
        err => console.log(err)
      );
    }
    this.setComponentsVisibility(false, !this.showColleaguesComponent, false, false, false);
  }

  showSearch(searchPhrase: string, category: string) {
    if (category === 'course') {

    } else {
      if (!this.showColleaguesComponent) {
        this.apiService.findUsers(searchPhrase, category).subscribe(users => {
            if (users) {
              this.users = users;
            }
          }, err => console.log(err)
        );
      }
      this.setComponentsVisibility(false, !this.showColleaguesComponent, false, false, false);
    }
  }

  private setComponentsVisibility(grades: boolean, colleagues: boolean, email: boolean, account: boolean, searchCourse: boolean) {
    this.showGradesComponent = grades;
    this.showColleaguesComponent = colleagues;
    this.showEmailComponent = email;
    this.showAccountComponent = account;
    this.showSearchCourseComponent = searchCourse;
  }


}


