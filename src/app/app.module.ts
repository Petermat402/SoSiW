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
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {EntryComponent} from './entry/entry.component';
import {ApiService} from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent
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
    MatSelectModule
  ],
  providers: [
    ThemeService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
