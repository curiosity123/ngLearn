import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/operators';
import { map, tap } from 'rxjs/operators';
import { LearningItem } from 'src/models/LearningItem';
import { FormsModule } from '@angular/forms'



@Component({
  selector: 'app-Lesson',
  templateUrl: './Lesson.component.html',
  styleUrls: ['./Lesson.component.css']
})
export class LessonComponent implements OnInit {


  constructor(private http: HttpClient) {

  }
  Item: LearningItem = null;
  indx = 0;
  Items: LearningItem[];
  CorrectVisible = false;
  answers: string[];
  indexesOfGaps;
  error;
  separators: string[] = [' ', '/', '?', '!'];

  words: string[];

  ngOnInit() {

    this.getLearningItems();
    this.showNewItem();
  }

  getLearningItems() {
    this.http.get('http://localhost:5000/api/content')
      .subscribe((response: LearningItem[]) => {
        this.Items = response;
        this.showNewItem();
      });
  }

  showNewItem() {


    this.Item = this.Items[this.indx];
    this.words = this.splt(this.separators, this.Items[this.indx].sentenceWithGaps);
    this.answers = this.splt(this.separators, this.Items[this.indx].sentenceWithGaps);

    for (let i = 0; i < this.words.length; i++) {
      if (!this.words[i].includes('_'))
        this.answers[i] = null;
      else
        this.answers[i] = this.answers[i].replace('_', '');
    }
    if (this.indx < 10) {
      this.indx++;
    }
  }


  nextQuestion() {
    this.error = false;
    this.showNewItem();
    this.CorrectVisible = false;;
  }

  splt(signs: string[], sentence: string): string[] {
    for (let s in signs) {
      sentence = sentence.split(signs[s]).join('#');
    }
    return sentence.split('#');
  }

  checkAnswer() {
    this.CorrectVisible = true;
    this.error = false;
    const correctWords = this.splt(this.separators, this.Items[this.indx-1].correctSentence);
    for (let i = 0; i < this.words.length; i++) {
      if (this.answers[i] != null && (correctWords[i] !== this.answers[i])) {
        console.log(correctWords[i] + " " + this.answers[i]);
        this.error = true;
      }
    }

  }


}
