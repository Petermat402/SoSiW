import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EntryComponent} from './entry/entry.component';
import {MainPageComponent} from './main-page/main-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: EntryComponent},
  {path: 'main', component: MainPageComponent}
];

