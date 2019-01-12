import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ApiService} from '../services/api.service';
import {LanguageService} from '../services/language.service';
import {ErrorService} from '../services/error.service';
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
  emailMessage;
  selectedValue = 'users';

  ngOnInit() {
    this.messages = this.languageService.getCurrentLanguage().messages;
    this.emailMessage = {
      addresses: '',
      subject: '',
      password: '',
      text: ''
    };
  }

  onConfirm() {
    const confirmPasswordRef = this.openConfirmPasswordModal();

    confirmPasswordRef.afterClosed().subscribe(password => {
      if (password) {
        this.emailMessage.password = btoa(password);
        this.dialogRef.close();
      }

      console.log('yuupikaeey!!=>>', password);

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
