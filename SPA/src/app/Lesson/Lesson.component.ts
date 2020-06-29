import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { LearningItem } from 'src/models/LearningItem';
import { FormsModule } from '@angular/forms'
import { LessonSummaryComponent } from '../lesson-summary/lesson-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { userInfo } from 'os';
import { User } from 'src/models/User';
import { LearningProgress } from 'src/models/LearningProgress';




@Component({
  selector: 'app-Lesson',
  templateUrl: './Lesson.component.html',
  styleUrls: ['./Lesson.component.css']
})
export class LessonComponent implements OnInit {


  constructor(private http: HttpClient, public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router) {

  }
  Item: LearningItem = null;
  indx = 0;
  Items: LearningItem[];
  AnswerVisibility = false;
  answers: string[];
  indexesOfGaps;
  IsError;
  separators: string[] = [' ', '/', '?', '!', '.', ','];
  finished = false;
  words: string[];
  user: User;

  ngOnInit() {

    this.getLearningItems();
  }

  getLearningItems() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.http.get('http://localhost:5000/api/' + this.user.id + '/content')
      .subscribe((response: LearningItem[]) => {
        this.Items = response;
        this.showNewItem();
      });
  }

  showNewItem() {
    if (this.indx < 10) {
      this.Item = this.Items[this.indx];
      this.words = this.splt(this.separators, this.Items[this.indx].sentenceWithGaps);
      this.answers = this.splt(this.separators, this.Items[this.indx].sentenceWithGaps);

      for (let i = 0; i < this.words.length; i++) {
        if (!this.words[i].includes('_'))
          this.answers[i] = null;
        else
          this.answers[i] = this.answers[i].replace('_', '');
      }
      this.indx++;
    }
    else {

      this.dialog.open(LessonSummaryComponent, { disableClose: true });

      this.user = JSON.parse(localStorage.getItem('user'));

      let learningProgress= new Array<LearningProgress>();


      for (let i = 0; i < this.answers.length; i++) {
        const lp = { ownerId: Number.parseInt(this.user.id), learningItemId: this.Items[i].id, memorizedLevel: true } as LearningProgress;
        learningProgress.push(lp);
      }
      console.log(learningProgress);
      this.http.post('http://localhost:5000/api/' + this.user.id + '/content/UpdateProgress', learningProgress).subscribe(
        x => {
          console.log(x);

        },
        error => console.log(error)
      );


    }
  }


  nextQuestion() {
    this.IsError = false;
    this.showNewItem();
    this.AnswerVisibility = false;;
  }

  splt(signs: string[], sentence: string): string[] {
    for (let s in signs) {
      sentence = sentence.split(signs[s]).join('#');
    }
    return sentence.split('#');
  }

  checkAnswer() {
    this.AnswerVisibility = true;
    this.IsError = false;
    const correctWords = this.splt(this.separators, this.Items[this.indx - 1].correctSentence);
    for (let i = 0; i < this.words.length; i++) {
      if (this.answers[i] != null && (correctWords[i] !== this.answers[i])) {
        console.log(correctWords[i] + ' ' + this.answers[i]);
        this.IsError = true;
      }
    }



  }



}
