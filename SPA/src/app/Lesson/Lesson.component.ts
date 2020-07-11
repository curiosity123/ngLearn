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
import { Console } from 'console';
import { environment } from 'src/environments/environment';




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
  results: boolean[];

  ngOnInit() {

    var sub = this.route.params.subscribe(params => {

      console.log(params['id']);
      this.getLearningItems(params['id']);
    });

  }


  baseUrl = environment.apiUrl




  getLearningItems(learningSetId: number) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.results = new Array();
    this.http.get(this.baseUrl + this.user.id + '/content/' + learningSetId.toString() + '/GetItems')
      .subscribe((response: LearningItem[]) => {
        this.Items = response;
        this.showNewItem();
      });
  }

  showNewItem() {
    console.log(this.Items.length);
    if (this.indx < this.Items.length) {
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

      let learningProgress = new Array<LearningProgress>();
      console.log(this.results);

      for (let i = 0; i < this.Items.length; i++) {
        const lp = { ownerId: Number.parseInt(this.user.id), learningItemId: this.Items[i].id, memorizedLevel: this.results[i] } as LearningProgress;
        learningProgress.push(lp);
      }

      console.log("Progressy:" + learningProgress);
      this.http.post(this.baseUrl + this.user.id + '/content/UpdateProgress', learningProgress).subscribe(
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
        this.IsError = true;
      }

    }
    this.results.push(!this.IsError);



  }



}
