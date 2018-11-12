import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import * as ln from '../../languages.json';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private router: Router,
              private apiService: ApiService,
              private languageService: LanguageService) {
  }

  ngOnInit() {
    this.languageService.loadDefaultLanguage();
    this.router.navigate(['/login']);
  }

}
