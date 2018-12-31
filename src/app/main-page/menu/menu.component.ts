import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private languageService: LanguageService) {
  }

  @Input() messages;

  @Output() clickLogout = new EventEmitter<any>();
  @Output() clickSettings = new EventEmitter<any>();
  @Output() clickGrades = new EventEmitter<any>();
  @Output() clickColleagues = new EventEmitter<any>();
  @Output() clickEmail = new EventEmitter<any>();
  @Output() clickAccount = new EventEmitter<any>();

  ngOnInit() {
  }

  logout() {
    this.clickLogout.emit();
  }

  settings() {
    this.clickSettings.emit();
  }

  grades() {
    this.clickGrades.emit();
  }

  colleagues() {
    this.clickColleagues.emit();
  }

  email() {
    this.clickEmail.emit();
  }

  account() {
    this.clickAccount.emit();
  }

}
