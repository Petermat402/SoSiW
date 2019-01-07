import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Grade} from '../../models/grade';
import {User} from '../../models/user';

@Component({
  selector: 'app-confirm-password-modal',
  templateUrl: './confirm-password-modal.component.html',
  styleUrls: ['./confirm-password-modal.component.scss']
})
export class ConfirmPasswordModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmPasswordModalComponent>,
              @Inject(MAT_DIALOG_DATA) public messages) {
  }

  password: string;
  hide = true;

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
