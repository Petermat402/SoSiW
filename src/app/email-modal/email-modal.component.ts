import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Grade} from '../models/grade';
import {User} from '../models/user';
import {ApiService} from '../services/api.service';
import {LanguageService} from '../services/language.service';
import {ErrorService} from '../services/error.service';
import {EmailMessage} from '../models/emailMessage';
import {ConfirmPasswordModalComponent} from './confirm-password-modal/confirm-password-modal.component';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailModalComponent>,
              public confirmPasswordDialog: MatDialog,
              private apiService: ApiService,
              private languageService: LanguageService,
              private errorService: ErrorService) {
  }

  messages;
  emailMessage: EmailMessage;

  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.emailMessage = new EmailMessage('', '', '', '');
  }

  onConfirm() {
    const confirmPasswordRef = this.openConfirmPasswordModal();

    confirmPasswordRef.afterClosed().subscribe(password => {
      this.emailMessage.password = btoa(password);
      console.log('yuupikaeey!!');
      this.dialogRef.close();
    });
  }

  private openConfirmPasswordModal() {
    return this.confirmPasswordDialog.open(ConfirmPasswordModalComponent, {
      width: '25vw',
      data: this.messages
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
