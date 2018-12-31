import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageService} from '../services/language.service';
import {ApiService} from '../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private languageService: LanguageService,
    private apiService: ApiService) {
  }

  @Input() darkTheme;
  @Input() messages;
  languagesNames;
  hideOld = true;
  hideNew = true;
  hideRepeat = true;
  @Output() darkThemeChange = new EventEmitter<any>();
  @Output() languageChange = new EventEmitter<any>();
  infoMessage = '';
  showInfo = false;
  isError = false;

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
      this.infoMessage = this.messages.error.wrongRepeatedPassword;
      this.isError = true;
      this.showInfo = true;
      return;
    }

    this.apiService.changePassword(btoa(oldPassword), btoa(newPassword)).subscribe(response => {
        if (response.message) {
          this.infoMessage = response.message;
        }
      },
      error => {
        if (error.code === 404) {
          this.infoMessage = this.messages.error.unauthorizedUser;
        } else {
          this.infoMessage = this.messages.error.unidentifiedError + '  ' + error.status;
        }
        this.isError = true;
      },
      () => {
        this.showInfo = true;
      }
    );


  }

  confirmChangeEmail(newEmail: string) {
    this.apiService.changeEmail(newEmail).subscribe(response => {
        if (response.message) {
          this.infoMessage = response.message;
        }
      },
      error => {
        if (error.code === 404) {
          this.infoMessage = this.messages.error.unauthorizedUser;
        } else {
          this.infoMessage = this.messages.error.unidentifiedError + '  ' + error.status;
        }
        this.isError = true;
      },
      () => {
        this.showInfo = true;
      }
    );
  }

  clear(...inputs) {
    _.each(inputs, input => {
      input.value = '';
    });
  }
}
