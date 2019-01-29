import {Component, Inject, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {ErrorService} from '../services/error.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {

  constructor(private themeService: ThemeService,
              private errorService: ErrorService,
              private apiService: ApiService,
              public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
              @Inject(MAT_DIALOG_DATA) public messages) {
  }

  darkTheme = this.themeService.isDarkTheme;
  login = '';

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.apiService.sendRecoveryPasswordRequest(this.login).subscribe(response => {
    }, err => this.errorService.handleError(err));
    this.dialogRef.close();
  }

}
