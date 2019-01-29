import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {LanguageService} from '../services/language.service';
import {ErrorService} from '../services/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private themeService: ThemeService,
              private languageService: LanguageService,
              private errorService: ErrorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              public snackBar: MatSnackBar) {
  }

  darkTheme = this.themeService.isDarkTheme;
  hide = true;
  messages;
  languagesShorts;
  passwords = {new: '', repeated: ''};
  token = this.activatedRoute.snapshot.params['token'];

  ngOnInit() {
    this.languageService.loadDefaultLanguage();
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  switchTheme() {
    this.themeService.changeTheme();
    this.darkTheme = this.themeService.isDarkTheme;
    this.setBackground();
  }

  sendPasswords() {
    if (this.passwords.new !== this.passwords.repeated) {
      this.errorService.handleError({code: 424});
      return;
    }
    this.apiService.postChangedPasswords(btoa(this.passwords.new), this.token).subscribe(response => {
      this.openSnackBar(this.messages.common.success);
      this.goToLogin();
    }, err => this.errorService.handleError(err));
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-color', this.darkTheme ? 'background-color-dark' : 'background-color-light']
    });
  }

}
