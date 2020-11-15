import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { LessonSummaryComponent } from '../lesson-summary/lesson-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/models/Item';
import { User } from 'src/models/User';
import { ContentService } from 'src/services/content.service';
import { AccountService } from 'src/services/account.service';
import { LearningProgress } from 'src/models/LearningProgress';



@Component({
  selector: 'app-Lesson',
  templateUrl: './Lesson.component.html',
  styleUrls: ['./Lesson.component.css']
})
export class LessonComponent implements OnInit {


  item: Item = null;
  indx = 0;
  items: Item[];
  AnswerVisibility = false;
  answers: string[];
  indexesOfGaps;
  IsError;

  finished = false;
  words: string[];
  user: User;
  results: boolean[];

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private contentService: ContentService,
              private accountService: AccountService) {
    this.user = JSON.parse(localStorage.getItem('user'));

  }


  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.getLearningItems(params.id);
    });

  }


  getLearningItems(courseId: number) {

    this.results = new Array();
    this.contentService.GetLessonItems(courseId.toString()).subscribe((response: Item[]) => {
      this.items = response;
      this.showNewItem();
    });
  }

  showNewItem() {

    if (this.indx < this.items.length) {
      this.item = this.items[this.indx];
      this.words = this.contentService.SplitSentence(this.contentService.Separators, this.items[this.indx].sentenceWithGaps);
      this.answers = this.contentService.SplitSentence(this.contentService.Separators, this.items[this.indx].sentenceWithGaps);

      for (let i = 0; i < this.words.length; i++) {
        if (!this.words[i].includes('_')) {
          this.answers[i] = null;
        } else {
          this.answers[i] = this.answers[i].replace('_', '');
        }
      }
      this.indx++;
    } else {

      this.dialog.open(LessonSummaryComponent, { disableClose: true });
      let learningProgress = new Array<LearningProgress>();
      console.log(this.results);

      for (let i = 0; i < this.items.length; i++) {
        const lp = {
          ownerId: Number.parseInt(this.user.id),
          learningItemId: this.items[i].id,
          memorizedLevel: this.results[i]
        } as LearningProgress;
        learningProgress.push(lp);
      }

      console.log('Progressy:' + learningProgress);
      this.accountService.UpdateCourseProgress(learningProgress).subscribe(
        x => { },
        error => console.log(error)
      );
    }
  }


  nextQuestion() {
    this.IsError = false;
    this.showNewItem();
    this.AnswerVisibility = false;;
  }

  removeSpecialCharacters(s: string): string {
    return s
      .split('.').join('')
      .split(',').join('')
      .split('?').join('')
      .split('!').join('')
      .split('-').join('');
  }
 

  checkAnswer() {
    this.AnswerVisibility = true;
    this.IsError = false;

    const userAnswer = this.contentService.SplitSentence(this.contentService.Separators, this.items[this.indx - 1].sentenceWithGaps);
    const gapIndex = 0;
    let usersSentence = '';
    let correctSentence = this.removeSpecialCharacters(this.items[this.indx - 1].correctSentence);



    for (let w of userAnswer) {


      if (w === '') {
        continue;
      }

      if (!w.includes('_')) {
        usersSentence += w + ' ';
      } else {
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i] !== null) {
            usersSentence.trimRight();
            usersSentence += this.answers[i] + ' ';

            this.answers[i] = null;

            break;
          }
        }
      }
    }
    usersSentence = usersSentence.trimRight().trimLeft();
    correctSentence = correctSentence.trimRight().trimLeft();
    console.log(correctSentence);
    console.log(usersSentence);
    const correctWords = this.contentService.SplitSentence(this.contentService.Separators, this.items[this.indx - 1].correctSentence);

    if (usersSentence !== correctSentence) {
      this.IsError = true;
    }

    this.results.push(!this.IsError);
  }


}
