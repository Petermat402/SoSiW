import {Injectable} from '@angular/core';
import * as ln from '../../languages.json';
import * as _ from 'lodash';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
  }

  private languageSource = new BehaviorSubject({});
  langSrc$ = this.languageSource.asObservable();
  private currentLanguage;

  public loadDefaultLanguage() {
    LocalStorageService.setLanguages(ln.default.languages);
    this.currentLanguage = ln.default.languages[0];
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
    const newLanguage = _.filter(LocalStorageService.getLanguages(), language => {
      return language.short === languageShort;
    });
    this.currentLanguage = newLanguage[0];
    this.languageSource.next(this.currentLanguage);
  }

  public setCurrentLanguageByName(languageShort) {
    const newLanguage = _.filter(LocalStorageService.getLanguages(), language => {
      return language.value === languageShort;
    });
    this.currentLanguage = newLanguage[0];
    this.languageSource.next(this.currentLanguage);
  }
}
