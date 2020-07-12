import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  baseUrl = environment.apiUrl


  GetCoursesForUser(id: string) {
    return this.http.get(this.baseUrl + id + '/content/GetMyCourses');
  }

  ResetProgress(id: string, setId: string) {
    return this.http.post(this.baseUrl + id + '/content/' + setId + '/resetProgress', {});
  }

  GetProgress(id: string, courseId: string) 
  {
    return this.http.get(this.baseUrl + id + '/content/' + courseId + '/getProgress');
  }

  DeleteCourseFromBoard(id :string, courseId:string)
  {
    return this.http.delete(this.baseUrl + id + '/content/' + courseId + '/RemoveCourseFromMyBoard', {})
  }

}
