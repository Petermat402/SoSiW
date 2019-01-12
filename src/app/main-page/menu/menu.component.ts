import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private languageService: LanguageService) {
  }

  messages;
  subscription: Subscription;

  @Output() clickLogout = new EventEmitter<any>();
  @Output() clickSettings = new EventEmitter<any>();
  @Output() clickEmail = new EventEmitter<any>();

  private subscribeOnLanguageChange() {
    this.subscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  ngOnInit() {
    this.subscribeOnLanguageChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.clickLogout.emit();
  }

  settings() {
    this.clickSettings.emit();
  }

  email() {
    this.clickEmail.emit();
  }

}
