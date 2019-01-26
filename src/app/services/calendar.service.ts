import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private apiService: ApiService,
              private languageService: LanguageService) {
  }

  colors = new Map([
    [1, '#E85858'],
    [2, '#BF0FB6'],
    [3, '#7736E0'],
    [4, '#71A9EE'],
    [5, '#59F0E4'],
    [6, '#4EED86'],
    [7, '#B4F144'],
    [8, '#F4F132'],
    [9, '#FEA03A'],
    [10, '#F59E8E']
  ]);
  messages = this.languageService.getCurrentLanguage().messages;

  downloadStudentsLectures() {
    return this.apiService.getStudentsLectures().pipe(
      map((objects: any) => {
        const colorMap = this.createColorMap(objects);

        const calendarEvents = [];
        _.each(objects, object => {
          const title: string = object.courseName.concat(' ', this.messages.common.room, ': ', object.room);
          calendarEvents.push(
            {
              id: object.id,
              start: new Date(object.start_hour),
              end: new Date(object.end_hour),
              title: title,
              color: {
                primary: colorMap.get(object.id_course),
                secondary: colorMap.get(object.id_course)
              },
              room: object.room,
              group: object.group,
              courseName: object.courseName

            }
          );
        });
        return calendarEvents;
      })
    );
  }

  downloadTeachersLectures() {
    return this.apiService.getTeachersLectures().pipe(
      map((objects: any) => {
        const colorMap = this.createColorMap(objects);

        const calendarEvents = [];
        _.each(objects, object => {
          const title: string = object.courseName.concat(' ',
            this.messages.common.room,
            ': ', object.room,
            ' ', this.messages.common.group,
            ': ',
            object.group);
          calendarEvents.push(
            {
              id: object.id,
              start: new Date(object.start_hour),
              end: new Date(object.end_hour),
              title: title,
              color: {
                primary: colorMap.get(object.id_course),
                secondary: colorMap.get(object.id_course)
              },
              room: object.room,
              group: object.group,
              courseName: object.courseName

            }
          );
        });
        return calendarEvents;
      })
    );
  }

  private createColorMap(objects: any) {
    const colorMap = new Map();
    let iterator = 1;
    _.each(_.uniqWith(objects, (a: { id_course: number }, b: { id_course: number }) => {
      return a.id_course === b.id_course;
    }), object => {
      colorMap.set(object.id_course, this.colors.get(iterator));
      iterator++;
    });
    return colorMap;
  }
}
