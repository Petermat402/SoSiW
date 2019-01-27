import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {Subscription} from 'rxjs';
import {LanguageService} from '../services/language.service';
import {ApiService} from '../services/api.service';
import {Local} from 'protractor/built/driverProviders';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService,
              private apiService: ApiService,
              private errorService: ErrorService) {
  }

  messages;
  user = LocalStorageService.getUser();
  reminder = this.user.reminder;
  subscription: Subscription;

  ngOnInit() {
    this.subscribeOnLanguageChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.reminder !== this.user.reminder) {
      this.apiService.updateReminder(this.reminder).subscribe(response => {
          if (response) {
            this.user.reminder = this.reminder;
            LocalStorageService.setUser(this.user);
          }
        }, err => this.errorService.handleError(err)
      );
    }
  }

  private subscribeOnLanguageChange() {
    this.subscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

}
