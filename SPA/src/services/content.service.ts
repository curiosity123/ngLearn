import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/models/Pagination';
import { User } from 'src/models/User';
import { Item } from 'src/models/Item';
import { Course } from 'src/models/Course';


@Injectable({
  providedIn: 'root'
})
export class ContentService {


  loggedUser: User;
  baseUrl: string;
  Separators: string[] = [' ', '/', '?', '!', '.', ','];

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = environment.apiUrl;
  }

  GetItemsForCourse(courseId: string, pagination: Pagination) {

    console.log(pagination);
    const params = new HttpParams()
      .append('pageIndex', pagination.pageIndex.toString())
      .append('length', pagination.length.toString())
      .append('pageSize', pagination.pageSize.toString());
    console.log('request prepared');
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/' + courseId.toString() + '/GetItemsForCourse', { params });
  }

  GetLessonItems(courseId: string) {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/' + courseId.toString() + '/GetItems');
  }

  SplitSentence(signs: string[], sentence: string): string[] {
    for (let s in signs) {
      sentence = sentence.split(signs[s]).join('#');
    }
    return sentence.split('#');
  }

  GetAllCourses() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetAllCourses');
  }

  GetUserCourses() {
    return this.http.get(this.baseUrl + this.loggedUser.id + '/content/GetUserCourses');
  }

  CreateCourse(course: Course) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + 'CreateCourse', course);
  }

  RemoveCourse(CourseId: number) {
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + CourseId + '/RemoveCourse', {});
  }

  ModifyCourseDetails(courseId, title, description) {
    const params = new HttpParams()
      .append('title', title.toString())
      .append('description', description.toString());
    return this.http.put(this.baseUrl + this.loggedUser.id + '/content/' + courseId + '/ModifyCourseDetails', {}, { params });
  }

  UpdateItem(item: Item) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/UpdateItem', item);
  }

  RemoveItem(item: Item) {
    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + item.id.toString() + '/removeItem', {});
  }

  AddNewItem(item: Item, learningSetId: number) {
    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/' + learningSetId.toString() + '/AddNewItem', item);
  }

}
