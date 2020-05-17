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
  Item: LearningItem = null;
  index = 0;
  Items: LearningItem[];
  CorrectVisible: boolean = false;
  ngOnInit() {
   
      this.getLearningItems();
  }


  getLearningItems()
  {
    this.http.get('http://localhost:5000/api/content')
    .subscribe((response: LearningItem[]) => {
      this.Items = response;
      this.Item = this.Items[0];
    })
  }


  showCorrect() {
    this.CorrectVisible = true;

  }
  nextQuestion() {
    if(this.index<this.Items.length-1)
    {
    this.CorrectVisible = false;
    this.index++;
    this.Item = this.Items[this.index];
    }
    else
    {
      this.CorrectVisible = false;
      this.index =0;
      this.getLearningItems();
      this.Item = this.Items[this.index];
    }
  }

}
