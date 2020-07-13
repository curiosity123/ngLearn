import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';
import { LearningProgress } from 'src/models/LearningProgress';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  loggedUser: User;
  baseUrl: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = environment.apiUrl;
  }


  PushProgressToServer(learningProgress: LearningProgress[]) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/UpdateProgress', learningProgress);
  }
  GetLessonItems(courseId: string) {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/' + courseId.toString() + '/GetItems');
  }

}
