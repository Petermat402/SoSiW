import {Injectable} from '@angular/core';
import {User} from '../models/user';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  static setUser(user: User) {
    localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(user), localStorage.getItem('token')).toString());
  }

  static getUser(): User {
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('user'), localStorage.getItem('token')).toString(CryptoJS.enc.Utf8));
  }

  static dropUser() {
    localStorage.removeItem('user');
  }

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static dropToken() {
    localStorage.removeItem('token');
  }

  static setAcademicYear(academicYear: string) {
    localStorage.setItem('academicYear', academicYear);
  }

  static getAcademicYear(): string {
    return localStorage.getItem('academicYear');
  }

  static dropAcademicYear() {
    localStorage.removeItem('academicYear');
  }

  static setLanguages(languages) {
    localStorage.setItem('languages', JSON.stringify(languages));
  }

  static getLanguages() {
    return JSON.parse(localStorage.getItem('languages'));
  }

  static dropLanguages() {
    localStorage.removeItem('languages');
  }
}
