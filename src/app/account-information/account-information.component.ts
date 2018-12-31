import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {

  constructor() {
  }

  @Input() messages;
  @Input() user: User;

  ngOnInit() {
  }

}
