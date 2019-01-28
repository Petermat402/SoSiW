import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public snackBar: MatSnackBar,
              private languageService: LanguageService) {

  }

  public handleError(error) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
      console.error('Error occured: ', message);
    } else {
      message = error.code ? this.chooseError(error.code) : error.status ? this.chooseError(error.status) : 'Unknown';
    }
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['error-color', 'background-color-dark']
    });
  }

  private chooseError(errorCode) {
    const errorMessages = this.languageService.getCurrentLanguage().messages.error;
    switch (errorCode) {
      case 302: {
        return errorMessages.foundUsername;
      }
      case 400: {
        return errorMessages.unidentifiedError;
      }
      case 401: {
        return errorMessages.unauthorizedUser;
      }
      case 403: {
        return errorMessages.failToAuthorize;
      }
      case 419: {
        return errorMessages.noToken;
      }
      case 420: {
        return errorMessages.noSuchUser;
      }
      case 421: {
        return errorMessages.wrongPersonAsTeacher;
      }
      case 422: {
        return errorMessages.wrongCredentials;
      }
      case 423: {
        return errorMessages.wrongPassword;
      }
      case 424: {
        return errorMessages.wrongRepeatedPassword;
      }
      case 452: {
        return errorMessages.cannotModifyGrades;
      }
      case 453: {
        return errorMessages.wrongRole;
      }
      case 454: {
        return errorMessages.noGradeEntry;
      }
      case 455: {
        return errorMessages
      }
      case 456: {
        return errorMessages.fieldNoComplete;
      }
      case 500: {
        return errorMessages.databaseError;
      }

    }
  }
}
