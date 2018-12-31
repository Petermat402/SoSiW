import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {LanguageService} from '../services/language.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService,
    private languageService: LanguageService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  darkTheme = this.themeService.isDarkTheme;
  hide = true;
  messages;
  languagesShorts;
  errorMessage = '';

  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.languagesShorts = this.languageService.getAllLanguagesShorts();
  }

  ngAfterViewInit() {
    this.setBackground();
  }

  changeLanguage(languageShort) {
    this.languageService.setCurrentLanguageByShort(languageShort);
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  sendCredentials(login: string, password: string) {
    this.loginService.login(login, password).subscribe(user => {
        if (user) {
          console.log(user);
          this.loginService.setUser(user);
        }
      },
      error => {
        if (error.code === 401) {
          this.errorMessage = this.messages.error.unauthorizedUser;
        } else {
          this.errorMessage = error.message;
        }
      },
      () => {
        this.goToMain();
      });
  }

  switchTheme() {
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
}
