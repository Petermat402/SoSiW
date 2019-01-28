import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../services/language.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../services/theme.service';
import {FormControl, Validators} from '@angular/forms';
import {ErrorService} from '../services/error.service';
import {ControlPanelService} from '../services/control-panel.service';
import {MatSnackBar} from '@angular/material';

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
              public snackBar: MatSnackBar) {
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

  languageSubscription: Subscription;
  themeSubscription: Subscription;

  ngOnInit() {
    this.subscribeOnLanguageChange();
    this.subscribeOnThemeChange();
    this.languagesShorts = this.languageService.getAllLanguagesShorts();
  }


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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-color', this.darkTheme ? 'background-color-dark' : 'background-color-light']
    });
  }
}
