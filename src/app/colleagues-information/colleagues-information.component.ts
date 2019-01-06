import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {ApiService} from '../services/api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Grade} from '../models/grade';

@Component({
  selector: 'app-colleagues-information',
  templateUrl: './colleagues-information.component.html',
  styleUrls: ['./colleagues-information.component.scss']
})
export class ColleaguesInformationComponent implements OnInit {

  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() messages;
  @Input() userRole: string;
  @Input() users: MatTableDataSource<User>;
  @Input() darkTheme;
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'department', 'group', 'action'];

  ngOnInit() {
    if (this.userRole !== 'S') {
      this.displayedColumns = ['id', 'name', 'surname', 'email', 'department', 'action'];
    }
    this.setSortAndPaginator();
  }

  private setSortAndPaginator() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  sendEmail(element) {
  }

}
