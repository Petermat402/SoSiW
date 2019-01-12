import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import * as _ from 'lodash';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {LanguageService} from '../services/language.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {ThemeService} from '../services/theme.service';
import {SearchService} from '../services/search.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-colleagues-information',
  templateUrl: './colleagues-information.component.html',
  styleUrls: ['./colleagues-information.component.scss']
})
export class ColleaguesInformationComponent implements OnInit, OnDestroy {

  constructor(private languageService: LanguageService,
              private activatedRoute: ActivatedRoute,
              private themeService: ThemeService,
              private searchService: SearchService,
              private errorService: ErrorService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  messages;
  userRole = LocalStorageService.getUser().role;
  users: MatTableDataSource<User>;
  darkTheme;
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'department', 'group', 'action'];
  languageSubscription: Subscription;
  themeSubscription: Subscription;

  ngOnInit() {
    this.subscribeOnLanguageChange();
    this.subscribeOnThemeChange();
    this.activatedRoute.params.subscribe(params => {
      if (!_.isEmpty(params)) {
        console.log(params);
        this.downloadSearchUsers(params.searchPhrase, params.category);
      } else {
        this.downloadColleagues();
      }
    });

    if (this.userRole !== 'S') {
      this.displayedColumns = ['id', 'name', 'surname', 'email', 'department', 'action'];
    }
  }

  private downloadColleagues() {
    this.searchService.getColleagues().subscribe(users => {
        if (users) {
          this.users = new MatTableDataSource(users);
        }
      },
      err => this.errorService.handleError(err),
      () => this.setSortAndPaginator()
    );
  }

  private downloadSearchUsers(searchPhrase: string, category: string) {
    this.searchService.findUsers(searchPhrase, category).subscribe(users => {
        if (users) {
          this.users = new MatTableDataSource(users);
        }
      }, err => this.errorService.handleError(err),
      () => this.setSortAndPaginator()
    );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  private setSortAndPaginator() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  private subscribeOnThemeChange() {
    this.themeSubscription = this.themeService.themeSrc$
      .subscribe(darkTheme => {
        this.darkTheme = darkTheme;
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

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  sendEmail(element) {
  }

}
