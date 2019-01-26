import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {endOfDay, isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK} from 'angular-calendar';
import {ThemeService} from '../services/theme.service';
import {LanguageService} from '../services/language.service';
import {CalendarService} from '../services/calendar.service';
import {ErrorService} from '../services/error.service';
import {LocalStorageService} from '../services/local-storage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  events;
  activeDayIsOpen = true;
  darkTheme: boolean;
  themeSubscription: Subscription;
  languageSubscription: Subscription;
  messages;
  locale: string;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  userRole = LocalStorageService.getUser().role;

  constructor(private themeService: ThemeService,
              private languageService: LanguageService,
              private calendarService: CalendarService,
              private errorService: ErrorService) {
  }

  private subscribeOnLanguageChange() {
    this.languageSubscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
        this.locale = language.short;
        this.changeLanguageOnEvents();
        this.refresh.next();
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

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  private changeLanguageOnEvents() {
    if (this.userRole === 'S') {
      _.each(this.events, event => {
        event.title = event.courseName.concat(' ', this.messages.common.room, ': ', event.room);
      });
    } else {
      _.each(this.events, event => {
        event.title = event.courseName.concat(' ',
          this.messages.common.room,
          ': ', event.room,
          ' ', this.messages.common.group,
          ': ',
          event.group);
      });
    }
  }

  ngOnInit() {
    this.subscribeOnThemeChange();
    this.subscribeOnLanguageChange();
    if (LocalStorageService.getUser().role === 'S') {
      this.calendarService.downloadStudentsLectures().subscribe(events => {
          if (events) {
            this.events = events;
          }
        },
        err => this.errorService.handleError(err));
    } else {
      this.calendarService.downloadTeachersLectures().subscribe(events => {
          if (events) {
            this.events = events;
          }
        },
        err => this.errorService.handleError(err));
    }

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

}

