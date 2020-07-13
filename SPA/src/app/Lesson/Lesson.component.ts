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




  constructor(private http: HttpClient, public dialog: MatDialog, private route: ActivatedRoute, private lessonService: LessonService) { }
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
