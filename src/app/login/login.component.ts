import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {ApiService} from '../services/api.service';
import * as ln from '../../languages.json';
import {LanguageService} from '../services/language.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}
  darkTheme = this.themeService.isDarkTheme;
  hide = true;
  messages;
  languagesList;
  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.languagesList = this.languageService.getLanguagesList();
  }

  ngAfterViewInit() {
    this.elementRef
      .nativeElement
      .ownerDocument
      .body
      .style
      .backgroundImage = 'radial-gradient(circle, #a60505, #800117, #580a1b, #2f0d15, #210404, #000000)';
  }

  changeLanguage(languageShort){

  }

  switchTheme() {
    this.themeService.changeTheme();
    this.darkTheme = this.themeService.isDarkTheme;
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
