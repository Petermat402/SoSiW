import {Injectable} from '@angular/core';
import * as ln from '../../languages.json';
import * as _ from 'lodash';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private apiService: ApiService) {
  }

  private languageSource = new BehaviorSubject({});
  langSrc$ = this.languageSource.asObservable();
  private currentLanguage;

  lan: any = ln;

  public loadDefaultLanguage() {
    LocalStorageService.setLanguages(this.lan.default.languages);
    this.currentLanguage = this.lan.default.languages[0];
    console.log(this.currentLanguage);
  }

  public getCurrentLanguage() {
    return this.currentLanguage;
  }

  public getAllLanguagesShorts() {
    const shorts = [];
    _.forEach(LocalStorageService.getLanguages(), language => {
      shorts.push(language.short);
    });
    return shorts;
  }

  public getAllLanguagesNames() {
    const fullNames = [];
    _.forEach(LocalStorageService.getLanguages(), language => {
      fullNames.push(language.value);
    });
    return fullNames;
  }

  public setCurrentLanguageByShort(languageShort) {
    const newLanguage = _.filter(LocalStorageService.getLanguages(), (language: any) => {
      return language.short === languageShort;
    });
    this.currentLanguage = newLanguage[0];
    this.languageSource.next(this.currentLanguage);
  }

  public setCurrentLanguageByName(languageValue) {
    const newLanguage = _.filter(LocalStorageService.getLanguages(), (language: any) => {
      return language.value === languageValue;
    });
    this.currentLanguage = newLanguage[0];
    this.apiService.updateLanguage(this.currentLanguage.short).subscribe(response => {
    }, err => console.error(err));
    this.languageSource.next(this.currentLanguage);
  }
}
