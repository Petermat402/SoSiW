import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {User} from '../models/user';
import {LanguageService} from '../services/language.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ErrorService} from '../services/error.service';
import {EmailModalComponent} from '../email-modal/email-modal.component';
import {LocalStorageService} from '../services/local-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private elementRef: ElementRef,
              private themeService: ThemeService,
              private languageService: LanguageService,
              private router: Router,
              private errorService: ErrorService,
              public emailModal: MatDialog) {
  }

  darkTheme: boolean;
  user: User;
  messages;
  languageSubscription: Subscription;
  themeSubscription: Subscription;

  showSettingsComponent = false;
  searchCategory = 'student';

  ngOnInit() {
    this.subscribeOnThemeChange();
    this.subscribeOnLanguageChange();
    this.user = LocalStorageService.getUser();
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  private subscribeOnThemeChange() {
    this.themeSubscription = this.themeService.themeSrc$
      .subscribe(darkTheme => {
        this.darkTheme = darkTheme;
        this.setBackground();
      });
    this.darkTheme = this.themeService.isDarkTheme;
  }

  private subscribeOnLanguageChange() {
    this.languageSubscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  private setBackground() {
    if (this.darkTheme) {
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

  private openEmailModal() {
    return this.emailModal.open(EmailModalComponent, {
      width: '50vw'
    });
  }

  logout() {
    this.user = null;
    new Promise((resolve, reject) => {
      LocalStorageService.dropToken();
      LocalStorageService.dropUser();
      resolve();
    }).then(() => {
      this.router.navigate(['/login']);
    });

  }

  showEmail() {
    this.openEmailModal().afterClosed().subscribe(result => {
    });
  }

  showSearch(searchPhrase: string, category: string) {
    if (category === 'course') {
      this.router.navigate([`main/searchCourse/${searchPhrase}`])
        .catch(error => this.errorService.handleError(error));
    } else {
      this.router.navigate([`main/search/${category}/${searchPhrase}`])
        .catch(error => this.errorService.handleError(error));
    }
  }
}


