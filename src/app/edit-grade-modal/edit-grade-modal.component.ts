import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Grade, GradeBackend} from '../models/grade';
import {User} from '../models/user';
import {ApiService} from '../services/api.service';
import {LanguageService} from '../services/language.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-edit-grade-modal',
  templateUrl: './edit-grade-modal.component.html',
  styleUrls: ['./edit-grade-modal.component.scss']
})
export class EditGradeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditGradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: Grade, user: User }, // grade: Grade,
    private apiService: ApiService,
    private languageService: LanguageService,
    private errorService: ErrorService) {
  }

  user: User;
  messages;


  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(value) {
    const gradeToSend = {
      studentId: this.data.grade.studentId,
      courseId: this.data.grade.courseId,
      term: this.data.grade.term,
      value: value
    };
    this.apiService.updateGrade(gradeToSend).subscribe((grade: GradeBackend) => {
        if (grade.studentId === this.data.grade.studentId &&
          grade.courseId === this.data.grade.courseId &&
          grade.term === this.data.grade.term) {
          this.data.grade.value = grade.value;
        }
      },
      err => this.errorService.handleError(err)
    );
    this.dialogRef.close();
  }

}
