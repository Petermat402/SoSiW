import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LanguageService} from '../../services/language.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';

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
  userRole = LocalStorageService.getUser().role;

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

  controlPanel() {
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

  calendar() {
    switch (this.userRole) {
      case 'A': {
        this.router.navigate(['main/administrator/calendar']);
        break;
      }
      case 'T': {
        this.router.navigate(['main/teacher/calendar']);
        break;
      }
      case 'S': {
        this.router.navigate(['main/student/calendar']);
        break;
      }
    }
  }

}
