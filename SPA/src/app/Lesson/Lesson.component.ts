import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { LearningItem } from 'src/models/LearningItem';



@Component({
  selector: 'app-Lesson',
  templateUrl: './Lesson.component.html',
  styleUrls: ['./Lesson.component.css']
})
export class LessonComponent implements OnInit {

  constructor(private http: HttpClient) { }
  Items: LearningItem[];
  ngOnInit() {
    this.http.get('http://localhost:5000/api/content')
      .subscribe((response: LearningItem[]) => {
        this.Items = response;
      })
  }

}
