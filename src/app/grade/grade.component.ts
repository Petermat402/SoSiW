import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Grade} from '../models/grade';
import * as _ from 'lodash';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../models/user';
import {EditGradeModalComponent} from '../edit-grade-modal/edit-grade-modal.component';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  constructor(private apiService: ApiService,
              private errorService: ErrorService,
              public dialog: MatDialog) {
  }

  @Input() userRole: string;
  @Input() messages;
  @Input() darkTheme;
  displayedColumns: string[] = ['courseName', 'academicYear', 'semester', 'value', 'term', 'teacherName', 'teacherSurname'];
  grades: MatTableDataSource<Grade>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    if (this.userRole === 'T') {
      this.displayedColumns = ['courseName', 'academicYear', 'semester', 'value', 'term', 'studentId', 'action'];
      this.apiService.getTeacherGrades().subscribe(grades => {
          if (!_.isEmpty(grades)) {
            this.grades = new MatTableDataSource(grades);
            this.setSortAndPaginator();
          }
        },
        err => this.errorService.handleError(err)
      );
    } else {
      this.apiService.getStudentGrades().subscribe(grades => {
          if (!_.isEmpty(grades)) {
            this.grades = new MatTableDataSource(grades);
            this.setSortAndPaginator();
          }
        },
        err => this.errorService.handleError(err)
      );
    }
  }

  private setSortAndPaginator() {
    this.grades.paginator = this.paginator;
    this.grades.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.grades.filter = filterValue.trim().toLowerCase();
    if (this.grades.paginator) {
      this.grades.paginator.firstPage();
    }
  }

  displayEditGradeModal(element) {
    console.log(element);

    this.apiService.findUsers(element.studentId.toString(), 'student').subscribe((students: User[]) => {
        if (students.length === 1) {
          const dialogRef = this.dialog.open(EditGradeModalComponent, {
            width: '50vw',
            data: {grade: element, user: students[0]}
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      },
      err => this.errorService.handleError(err)
    );
  }

}
