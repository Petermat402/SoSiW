import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageService} from '../services/language.service';
import {ApiService} from '../services/api.service';
import * as _ from 'lodash';
import {ErrorService} from '../services/error.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private languageService: LanguageService,
    private apiService: ApiService,
    private errorService: ErrorService,
    public snackBar: MatSnackBar,) {
  }

  @Input() darkTheme;
  @Input() messages;
  languagesNames;
  hideOld = true;
  hideNew = true;
  hideRepeat = true;
  @Output() darkThemeChange = new EventEmitter<any>();
  @Output() languageChange = new EventEmitter<any>();

  ngOnInit() {
    this.languagesNames = this.languageService.getAllLanguagesNames();
  }

  switchTheme() {
    this.darkThemeChange.emit();
  }

  changeLanguage(languageName) {
    this.languageService.setCurrentLanguageByName(languageName);
    this.languageChange.emit();
  }

  confirmChangePassword(oldPassword: string, newPassword: string, repeatPassword: string) {
    if (newPassword !== repeatPassword) {
      this.errorService.handleError(424);
      return;
    }

    this.apiService.changePassword(btoa(oldPassword), btoa(newPassword)).subscribe(response => {
        if (response.message) {
          this.openSnackBar(response.message);
        }
      },
      error => this.errorService.handleError(error)
    );


  }

  confirmChangeEmail(newEmail: string) {
    this.apiService.changeEmail(newEmail).subscribe(response => {
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
