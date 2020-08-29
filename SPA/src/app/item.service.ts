import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';
import { Progress } from 'src/models/Progress';
import { CoursesCollection as CoursesCollection } from 'src/models/CoursesCollection';
import { LearningItem } from 'src/models/LearningItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  loggedUser: User;
  baseUrl: String

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.baseUrl = environment.apiUrl;

  }


  UpdateItem(item: LearningItem) {

    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/updateItem', item);
  }

  RemoveItem(item: LearningItem) {

    return this.http.delete(this.baseUrl + this.loggedUser.id + '/content/' + item.id.toString() + '/removeItem', {});
  }

  AddNewItem(item: LearningItem) {

    return this.http.post(this.baseUrl + this.loggedUser.id + '/content/addNewItem', item);
  }


}
