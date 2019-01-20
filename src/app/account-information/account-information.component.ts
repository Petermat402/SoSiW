import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {Subscription} from 'rxjs';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService) {
  }

  messages;
  user = LocalStorageService.getUser();
  subscription: Subscription;

  ngOnInit() {
    this.subscribeOnLanguageChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeOnLanguageChange() {
    this.subscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

}
