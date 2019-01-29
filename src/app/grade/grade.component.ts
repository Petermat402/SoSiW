import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Grade} from '../models/grade';
import * as _ from 'lodash';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../models/user';
import {EditGradeModalComponent} from '../edit-grade-modal/edit-grade-modal.component';
import {ErrorService} from '../services/error.service';
import {GradeService} from '../services/grade.service';
import {SearchService} from '../services/search.service';
import {Subscription} from 'rxjs';
import {LanguageService} from '../services/language.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService,
              private errorService: ErrorService,
              private gradeService: GradeService,
              private themeService: ThemeService,
              private languageService: LanguageService,
              public dialog: MatDialog) {
  }

  userRole = LocalStorageService.getUser().role;
  darkTheme: boolean;
  displayedColumns: string[] = ['courseName', 'academicYear', 'semester', 'value', 'term', 'teacherName', 'teacherSurname'];
  grades: MatTableDataSource<Grade>;
  languageSubscription: Subscription;
  themeSubscription: Subscription;
  messages;
  academicYears: string[];
  filterCriteria = {
    academicYear: LocalStorageService.getAcademicYear(),
    semester: 'summer'
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscribeOnLanguageChange() {
    this.languageSubscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  private subscribeOnThemeChange() {
    this.themeSubscription = this.themeService.themeSrc$
      .subscribe(darkTheme => {
        this.darkTheme = darkTheme;
      });
    this.darkTheme = this.themeService.isDarkTheme;
  }

  ngOnInit() {
    this.subscribeOnLanguageChange();
    this.subscribeOnThemeChange();
    this.downloadAllAcademicYears();
    this.downloadGrades();
  }

  downloadGrades() {
    if (this.userRole === 'T') {
      this.downloadTeacherGrades();
    } else {
      this.downloadStudentGrades();
    }
  }

  private downloadStudentGrades() {
    this.gradeService.getStudentGrades(this.filterCriteria).subscribe(grades => {
        if (grades) {
          this.grades = new MatTableDataSource(grades);
          this.setSortAndPaginator();
        }
      },
      err => this.errorService.handleError(err)
    );
  }

  private downloadTeacherGrades() {
    this.displayedColumns = ['courseName', 'academicYear', 'semester', 'value', 'term', 'studentId', 'action'];
    this.gradeService.getTeacherGrades(this.filterCriteria).subscribe(grades => {
        if (grades) {
          this.grades = new MatTableDataSource(grades);
          this.setSortAndPaginator();
        }
      },
      err => this.errorService.handleError(err)
    );
  }

  private downloadAllAcademicYears() {
    this.gradeService.getAllAcademicYears().subscribe(academicYears => {
        if (academicYears) {
          this.academicYears = academicYears;
        }
      },
      err => this.errorService.handleError(err)
    );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
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
    this.searchService.findUsers(element.studentId.toString(), 'student').subscribe((students: User[]) => {
        if (students.length === 1) {
          const dialogRef = this.dialog.open(EditGradeModalComponent, {
            width: '50vw',
            data: {grade: element, user: students[0]}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              element.value = result;
            }
            console.log('The dialog was closed==>>', result);
          });
        }
      },
      err => this.errorService.handleError(err)
    );
  }

}
