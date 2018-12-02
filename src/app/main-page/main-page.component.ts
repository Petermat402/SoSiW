import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {User} from '../models/user';
import {LanguageService} from '../services/language.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private themeService: ThemeService,
              private languageService: LanguageService,
              private loginService: LoginService) {
  }

  darkTheme = this.themeService.isDarkTheme;
  user: User;
  messages;

  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.user = this.loginService.getUser();
}

}
