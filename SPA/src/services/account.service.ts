import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { LearningProgress } from 'src/models/LearningProgress';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  loggedUser: User;
  baseUrl: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = environment.apiUrl;

  }


  Backup() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/account/Export', { responseType: 'blob' });
  }

  Import(formData) {
    console.log(formData);
    return this.http.post(this.baseUrl + this.loggedUser.id + '/account/Import', formData);
  }

  SaveUserSettings(repetitions: number, itemsPerLesson: number) {
    const params = new HttpParams()
      .append('repetitions', repetitions.toString())
      .append('itemsPerLesson', itemsPerLesson.toString());
    return this.http.put(this.baseUrl + this.loggedUser.id + '/account/SaveUserSettings', {}, { params });
  }

  ResetCourseProgress(setId: string) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/account/' + setId + '/ResetCourseProgress', {});
  }

  UpdateCourseProgress(learningProgress: LearningProgress[]) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/account/UpdateCourseProgress', learningProgress);
  }

  GetUsersCourses() {
    console.log('ID: ' + this.loggedUser.id);
    return this.http.get(this.baseUrl + this.loggedUser.id + '/account/GetUsersCourses');
  }

  RemoveCourseFromUsersCollection(courseId: string) {
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/account/' + courseId + '/RemoveCourseFromUsersCollection', {});
  }

  AddCourseToUsersCollection(CourseId: string) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/account/' + CourseId + '/AddCourseToUsersCollection', {});
  }

}
