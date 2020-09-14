import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { LearningItem } from 'src/models/LearningItem';
import { LessonSummaryComponent } from '../lesson-summary/lesson-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { LearningProgress } from 'src/models/LearningProgress';
import { LessonService } from '../lesson.service';




@Component({
  selector: 'app-Lesson',
  templateUrl: './Lesson.component.html',
  styleUrls: ['./Lesson.component.css']
})
export class LessonComponent implements OnInit {


  Item: LearningItem = null;
  indx = 0;
  Items: LearningItem[];
  AnswerVisibility = false;
  answers: string[];
  indexesOfGaps;
  IsError;

  finished = false;
  words: string[];
  user: User;
  results: boolean[];

  constructor(private http: HttpClient, public dialog: MatDialog, private route: ActivatedRoute, private lessonService: LessonService) {
    this.user = JSON.parse(localStorage.getItem('user'));

  }


  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.getLearningItems(params.id);
    });

  }


  getLearningItems(courseId: number) {

    this.results = new Array();
    this.lessonService.GetLessonItems(courseId.toString()).subscribe((response: LearningItem[]) => {
      this.Items = response;
      this.showNewItem();
    });
  }

  showNewItem() {

    if (this.indx < this.Items.length) {
      this.Item = this.Items[this.indx];
      this.words = this.lessonService.SplitSentence(this.lessonService.Separators, this.Items[this.indx].sentenceWithGaps);
      this.answers = this.lessonService.SplitSentence(this.lessonService.Separators, this.Items[this.indx].sentenceWithGaps);

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

      for (let i = 0; i < this.Items.length; i++) {
        const lp = {
          ownerId: Number.parseInt(this.user.id),
          learningItemId: this.Items[i].id,
          memorizedLevel: this.results[i]
        } as LearningProgress;
        learningProgress.push(lp);
      }

      console.log('Progressy:' + learningProgress);
      this.lessonService.PushProgressToServer(learningProgress).subscribe(
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

    const userAnswer = this.lessonService.SplitSentence(this.lessonService.Separators, this.Items[this.indx - 1].sentenceWithGaps);
    const gapIndex = 0;
    let usersSentence = '';
    let correctSentence = this.removeSpecialCharacters(this.Items[this.indx - 1].correctSentence);



    for (let w of userAnswer) {


      if (w === '') {
        continue;
      }

      if (!w.includes('_')) {
        usersSentence += w + ' ';
      }
      else {
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
    const correctWords = this.lessonService.SplitSentence(this.lessonService.Separators, this.Items[this.indx - 1].correctSentence);

    if (usersSentence !== correctSentence) {
      this.IsError = true;
    }

    this.results.push(!this.IsError);
  }


}
