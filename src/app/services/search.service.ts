import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import * as _ from 'lodash';
import {Course} from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {
  }

  courses: Course[] = [];
}
