import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Progress } from 'src/models/Progress';
import { CoursesCollection as CoursesCollection } from 'src/models/CoursesCollection';
import { Pagination } from 'src/models/Pagination';

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

  GetItemsForCourse(courseId: string, pagination: Pagination) {

    console.log(pagination);
    const params = new HttpParams()
    .append('pageIndex', pagination.pageIndex.toString())
    .append('length', pagination.length.toString())
    .append('pageSize', pagination.pageSize.toString());
    console.log("request prepared");
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/' + courseId.toString() + '/GetItemsForCourse', { params});
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
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + courseId + '/removeCourseFromMyBoard', {});
  }

  AddToUsersCollection(CourseId: string) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + CourseId + '/AddCourseToBoard', {});
  }

  GetAllCourses() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetAllCourses');
  }


  GetUserCoursesCollection() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetUserCoursesCollection');
  }

  AddNewCourse(Course: CoursesCollection) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + 'CreateCourse', Course);
  }

  RemoveMyCourse(CourseId: number) {
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + CourseId + '/removeMyCourse', {});
  }

}
