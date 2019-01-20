import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {ApiService} from './api.service';
import {EmailMessage} from '../models/emailMessage';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private apiService: ApiService) {
  }


  public sendEmail(emailMessage: EmailMessage, groupOfRecepients: string) {
    const addresses = this.convertAddressesToArray(emailMessage.addresses);
    if (groupOfRecepients === 'users') {
      this.validateAddresses(addresses);
    }
    const emailObject = {
      addresses: addresses,
      password: emailMessage.password,
      text: emailMessage.text,
      subject: emailMessage.subject
    };
    return this.apiService.sendEmail(emailObject, groupOfRecepients);

  }




  convertAddressesToArray(addresses: string) {
    const addressesArray: string[] = [];
    addresses = addresses.trim();
    addresses = addresses.replace(' ', '');
    while (addresses.includes(',')) {
      const address = addresses.slice(0, addresses.indexOf(','));
      addresses.replace(address.concat(','), '');
      addressesArray.push(address.toLowerCase());
    }
    return addressesArray;
  }

  validateAddresses(addresses: string[]) {
    _.each(addresses, (address: string) => {
      if (!address.includes('@')) {
        throw {
          code: 455,
          text: 'not valid email address'
        };
      }
    });
  }
}
