import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../services/language.service';
import * as _ from 'lodash';
import {ErrorService} from '../services/error.service';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SettingsService} from '../services/settings.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private settingsService: SettingsService,
    private errorService: ErrorService,
    public snackBar: MatSnackBar) {
  }

  darkTheme: boolean;
  messages;
  languageSubscription: Subscription;
  themeSubscription: Subscription;
  languagesNames;
  hideOld = true;
  hideNew = true;
  hideRepeat = true;

  passwords = {
    oldPassword: '',
    newPassword: '',
    repeatedPassword: ''
  };

  emailFormControl = new FormControl('', [
    Validators.email,
  ]);

  matcher = new EmailErrorStateMatcher();

  private subscribeOnLanguageChange() {
    this.languageSubscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  private subscribeOnThemeChange() {
    this.themeSubscription = this.themeService.themeSrc$
      .subscribe(darkTheme => {
        this.darkTheme = darkTheme;
      });
    this.darkTheme = this.themeService.isDarkTheme;
  }

  ngOnInit() {
    this.subscribeOnLanguageChange();
    this.subscribeOnThemeChange();
    this.languagesNames = this.languageService.getAllLanguagesNames();
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  switchTheme() {
    this.themeService.changeTheme();
  }

  changeLanguage(languageName) {
    this.languageService.setCurrentLanguageByName(languageName);
  }

  confirmChangePassword() {
    if (this.passwords.newPassword !== this.passwords.repeatedPassword) {
      this.errorService.handleError(424);
      return;
    }

    this.settingsService.changePassword(btoa(this.passwords.oldPassword), btoa(this.passwords.newPassword)).subscribe(response => {
        if (response.message) {
          this.openSnackBar(response.message);
        }
      },
      error => this.errorService.handleError(error)
    );


  }

  confirmChangeEmail(newEmail: string) {
    this.settingsService.changeEmail(newEmail).subscribe(response => {
        if (response.message) {
          this.openSnackBar(response.message);
        }
      },
      error => this.errorService.handleError(error)
    );
  }

  clear(...inputs) {
    _.each(inputs, input => {
      input.value = '';
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-color', this.darkTheme ? 'background-color-dark' : 'background-color-light']
    });
  }
}

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
