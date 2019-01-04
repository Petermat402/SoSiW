import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-colleagues-information',
  templateUrl: './colleagues-information.component.html',
  styleUrls: ['./colleagues-information.component.scss']
})
export class ColleaguesInformationComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  @Input() messages;
  @Input() userRole: string;
  @Input() users: User[];
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'department', 'group'];

  ngOnInit() {
    if (this.userRole !== 'S') {
      this.displayedColumns = ['id', 'name', 'surname', 'email', 'department'];
    }
  }

}
