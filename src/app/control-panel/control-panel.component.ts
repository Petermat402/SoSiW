import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../services/language.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../services/theme.service';
import {FormControl, Validators} from '@angular/forms';
import {ErrorService} from '../services/error.service';
import {ControlPanelService} from '../services/control-panel.service';
import {MatSnackBar} from '@angular/material';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService,
              private themeService: ThemeService,
              private errorService: ErrorService,
              private controlPanelService: ControlPanelService,
              public snackBar: MatSnackBar,
              private apiService: ApiService) {
  }

  messages;
  darkTheme;
  languagesShorts;

  newUser = {
    login: '',
    password: '',
    role: 'S',
    name: '',
    surname: '',
    pesel: '',
    email: '',
    departament: '',
    language: 'EN',
    group: ''
  };


  usernameFC = new FormControl('', Validators.required);
  passwordFC = new FormControl('', Validators.required);
  nameFC = new FormControl('', Validators.required);
  surnameFC = new FormControl('', Validators.required);
  peselFC = new FormControl('', Validators.required);
  emailFC = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  departmentFC = new FormControl('', Validators.required);


  userLoginFC = new FormControl('', Validators.required);


  activeUser = {
    messageActive: '',
    userLogin: '',
    id: -1
  };

  languageSubscription: Subscription;
  themeSubscription: Subscription;

  ngOnInit() {
    this.subscribeOnLanguageChange();

    this.subscribeOnThemeChange();

    this.languagesShorts = this.languageService.getAllLanguagesShorts();
  }


  private subscribeOnLanguageChange() {
    this
      .languageSubscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this
      .messages = this.languageService.getCurrentLanguage().messages;
  }

  private subscribeOnThemeChange() {
    this.themeSubscription = this.themeService.themeSrc$
      .subscribe(darkTheme => {
        this.darkTheme = darkTheme;
      });
    this.darkTheme = this.themeService.isDarkTheme;
  }

  private checkNewUser() {
    return this.usernameFC.hasError('required') || this.passwordFC.hasError('required') || this.nameFC.hasError('required') ||
      this.surnameFC.hasError('required') || this.peselFC.hasError('required') || this.departmentFC.hasError('required') ||
      this.emailFC.hasError('required') || this.emailFC.hasError('email');
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  sendNewUser() {
    if (this.checkNewUser()) {
      this.errorService.handleError({code: 456});
      return;
    }
    this.controlPanelService.checkUsername(this.newUser.login).subscribe((result: any) => {
      if (result.message) {
        this.controlPanelService.sendRegisterUser(this.newUser).subscribe(user => {
          if (user) {
            this.openSnackBar(this.messages.common.success);
            this.clearNewUser();
          }
        }, err => this.errorService.handleError(err));

      }
      return false;
    }, err => this.errorService.handleError(err));
  }

  clearNewUser() {
    this.newUser = {
      login: '',
      password: '',
      role: 'S',
      name: '',
      surname: '',
      pesel: '',
      email: '',
      departament: '',
      language: 'EN',
      group: ''
    };
  }

  clearLogin() {
    this.activeUser.userLogin = '';
    this.activeUser.messageActive = '';
    this.activeUser.id = -1;
  }

  checkLogin() {
    this.apiService.checkIfActiveUser(this.activeUser.userLogin).subscribe((response: any) => {
      if (response.message) {
        this.activeUser.messageActive = response.message;
        this.activeUser.id = response.id;
      }
    }, err => this.errorService.handleError(err));

  }

  sendActivateDeactivate() {
    if (this.activeUser.id === -1) {
      return;
    }

    if (this.activeUser.messageActive === 'active') {
      this.apiService.sendDeactivate(this.activeUser.id).subscribe((response: any) => {
        if (response.message) {
          this.openSnackBar(this.messages.common.success);
          this.clearLogin();
        }
      }, err => this.errorService.handleError(err));
    } else {
      this.apiService.sendActivate(this.activeUser.id).subscribe((response: any) => {
        if (response.message) {
          this.openSnackBar(this.messages.common.success);
          this.clearLogin();
        }
      }, err => this.errorService.handleError(err));
    }
  }


  openSnackBar(message: string
  ) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-color', this.darkTheme ? 'background-color-dark' : 'background-color-light']
    });
  }
}
