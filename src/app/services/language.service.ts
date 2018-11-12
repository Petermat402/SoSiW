import {Injectable} from '@angular/core';
import * as ln from '../../languages.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() {
  }

  private currentLanguage;
  private languagesList;

  public loadDefaultLanguage() {
    this.languagesList = ln.default.languages;
    this.currentLanguage = ln.default.languages[0];
    console.log(this.currentLanguage);
  }

  public getCurrentLanguage() {
    return this.currentLanguage;
  }
  public getLanguagesList() {
    return this.languagesList;
  }
  public setCurrentLanguageByShort(languageShort) {

  }
}
