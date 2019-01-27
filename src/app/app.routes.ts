import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EntryComponent} from './entry/entry.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AccountInformationComponent} from './account-information/account-information.component';
import {ColleaguesInformationComponent} from './colleagues-information/colleagues-information.component';
import {GradeComponent} from './grade/grade.component';
import {SearchCourseComponent} from './search-course/search-course.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarAdministratorComponent} from './calendar-administrator/calendar-administrator.component';
import {PasswordRecoveryComponent} from './password-recovery/password-recovery.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: EntryComponent},
  {path: 'main', component: MainPageComponent,
  children: [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'accountInformation', component: AccountInformationComponent},
    {path: 'colleagues', component: ColleaguesInformationComponent},
    {path: 'search/:category/:searchPhrase', component: ColleaguesInformationComponent},
    {path: 'searchCourse/:searchPhrase', component: SearchCourseComponent},
    {path: 'grades', component: GradeComponent},
    {path: 'student/calendar', component: CalendarComponent},
    {path: 'teacher/calendar', component: CalendarComponent},
    {path: 'administrator/calendar', component: CalendarAdministratorComponent}
  ]},
  {path: 'recovery/:token', component: PasswordRecoveryComponent}
];

