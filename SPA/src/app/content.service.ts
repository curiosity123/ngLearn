import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Progress } from 'src/models/Progress';
import { CoursesCollection as CoursesCollection } from 'src/models/CoursesCollection';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  loggedUser: User;
  baseUrl: String

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = environment.apiUrl;

  }


  GetUsersCourses() {
    console.log("ID: " + this.loggedUser.id);
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetMyCourses');
  }

  UpdateProgress(courses: CoursesCollection[]) {
    var progresses = new Array<Progress>();
    for (let i = 0; i < courses.length; i++) {
      this.GetCourseProgress(courses[i].id.toString()).subscribe((res: Progress) => {
        progresses.push(res);
      });
      return progresses;
    }
  }

  ResetCourseProgress(setId: string) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + setId + '/resetProgress', {});
  }

  GetCourseProgress(courseId: string) {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/' + courseId + '/getProgress');
  }

  RemoveFromUsersCollection(courseId: string) {
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + courseId + '/RemoveCourseFromMyBoard', {})
  }

  AddToUsersCollection(CourseId: string) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + CourseId + '/AddCourseToBoard', {})
  }

  GetAllCourses() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetAllCourses');
  }
}
