import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ApiService} from '../services/api.service';
import {LanguageService} from '../services/language.service';
import {ErrorService} from '../services/error.service';
import {ConfirmPasswordModalComponent} from './confirm-password-modal/confirm-password-modal.component';
import {EmailMessage} from '../models/emailMessage';
import {EmailService} from '../services/email.service';

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
              private errorService: ErrorService,
              @Inject(MAT_DIALOG_DATA) public emailAddress: string,
              private emailService: EmailService) {
  }

  messages;
  emailMessage: EmailMessage;
  selectedValue = 'users';

  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.emailMessage = {
      addresses: '',
      subject: '',
      password: '',
      text: ''
    };

    if (this.emailAddress) {
      this.emailMessage.addresses = this.emailAddress;
    }
  }

  onConfirm() {
    const confirmPasswordRef = this.openConfirmPasswordModal();
    confirmPasswordRef.afterClosed().subscribe(password => {
      if (password) {
        this.emailMessage.password = btoa(password);
        this.emailService.sendEmail(this.emailMessage, this.selectedValue)
          .subscribe(info => {
            },
            err => this.errorService.handleError(err),
            () => this.dialogRef.close()
          );
      }
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
