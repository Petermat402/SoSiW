import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  language = {};

  public parseJSON(jsonPath: string) {
    return this.httpClient.get(jsonPath);
  }
}
