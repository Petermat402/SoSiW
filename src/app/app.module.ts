import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ThemeService} from './services/theme.service';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {EntryComponent} from './entry/entry.component';
import {ApiService} from './services/api.service';
import {LanguageService} from './services/language.service';
import {LoginService} from './services/login.service';
import {MainPageComponent} from './main-page/main-page.component';
import {MenuComponent} from './main-page/menu/menu.component';
import {SettingsComponent} from './settings/settings.component';
import {AccountInformationComponent} from './account-information/account-information.component';
import {ColleaguesInformationComponent} from './colleagues-information/colleagues-information.component';
import {SearchCourseComponent} from './search-course/search-course.component';
import {GradeComponent} from './grade/grade.component';
import {AddGradeModalComponent} from './add-grade-modal/add-grade-modal.component';
import {EditGradeModalComponent} from './edit-grade-modal/edit-grade-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorService} from './services/error.service';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { ConfirmPasswordModalComponent } from './email-modal/confirm-password-modal/confirm-password-modal.component';
import {EmailService} from './services/email.service';
import {GradeService} from './services/grade.service';
import {SettingsService} from './services/settings.service';
import {SearchService} from './services/search.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarAdministratorComponent } from './calendar-administrator/calendar-administrator.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localeDe from '@angular/common/locales/de';
import {CalendarService} from './services/calendar.service';

registerLocaleData(localePl, 'pl');
registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    MainPageComponent,
    MenuComponent,
    SettingsComponent,
    AccountInformationComponent,
    ColleaguesInformationComponent,
    SearchCourseComponent,
    GradeComponent,
    AddGradeModalComponent,
    EditGradeModalComponent,
    EmailModalComponent,
    ConfirmPasswordModalComponent,
    CalendarComponent,
    CalendarAdministratorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    FlatpickrModule.forRoot(),
    CommonModule,
    MatCheckboxModule
  ],
  providers: [
    ThemeService,
    ApiService,
    LanguageService,
    LoginService,
    ErrorService,
    EmailService,
    GradeService,
    SettingsService,
    SearchService,
    CalendarService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditGradeModalComponent,
    AddGradeModalComponent,
    EmailModalComponent,
    ConfirmPasswordModalComponent
  ]
})
export class AppModule {
}
