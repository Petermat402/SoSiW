import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Course} from '../models/course';
import * as _ from 'lodash';
import {ApiService} from '../services/api.service';
import {ErrorService} from '../services/error.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {

  constructor(private apiService: ApiService,
              private errorService: ErrorService) {
  }

  courses: Course[];
  @Input() searchPhrase;
  @Input() messages;
  displayedColumns: string[] = ['id', 'name', 'academicYear', 'semester', 'teacherName', 'teacherSurname', 'department', 'email'];

  ngOnInit() {
    this.apiService.findCourses(this.searchPhrase).subscribe(courses => {
        if (courses) {
          this.courses = courses;
        }
      },
      err => this.errorService.handleError(err)
    );
  }

}
