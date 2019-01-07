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
  MatButtonModule,
  MatCardModule,
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
import {FormsModule} from '@angular/forms';
import {ErrorService} from './services/error.service';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { ConfirmPasswordModalComponent } from './email-modal/confirm-password-modal/confirm-password-modal.component';

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
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    ThemeService,
    ApiService,
    LanguageService,
    LoginService,
    ErrorService
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
