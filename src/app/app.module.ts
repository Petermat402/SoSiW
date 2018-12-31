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
  MatCardModule, MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {EntryComponent} from './entry/entry.component';
import {ApiService} from './services/api.service';
import {LanguageService} from './services/language.service';
import {LoginService} from './services/login.service';
import { MainPageComponent } from './main-page/main-page.component';
import { MenuComponent } from './main-page/menu/menu.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountInformationComponent } from './account-information/account-information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    MainPageComponent,
    MenuComponent,
    SettingsComponent,
    AccountInformationComponent
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
    MatDividerModule

  ],
  providers: [
    ThemeService,
    ApiService,
    LanguageService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
