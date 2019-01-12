import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Course} from '../models/course';
import {ErrorService} from '../services/error.service';
import {LanguageService} from '../services/language.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {

  constructor(private languageService: LanguageService,
              private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private errorService: ErrorService) {
  }

  courses: Course[];
  messages;
  subscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'academicYear', 'semester', 'teacherName', 'teacherSurname', 'department', 'email'];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.searchService.findCourses(params.searchPhrase).subscribe(courses => {
            if (courses) {
              this.courses = courses;
            }
          }
        );
      },
      err => this.errorService.handleError(err)
    );
    this.subscribeOnLanguageChange();
  }

  private subscribeOnLanguageChange() {
    this.subscription = this.languageService.langSrc$
      .subscribe((language: any) => {
        this.messages = language.messages;
      });
    this.messages = this.languageService.getCurrentLanguage().messages;
  }
}
