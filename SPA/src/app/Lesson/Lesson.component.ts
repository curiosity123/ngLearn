import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) { this.answers = [" ", " ", " "]; }
  Item: LearningItem = null;
  indx = 0;
  Items: LearningItem[];
  CorrectVisible = false;
  gaps: string[];
  answers: [" ", " ", " "];
  indexesOfGaps;
  separators: string[] = [' ', '/', '?', '!'];

  ngOnInit() {

    this.getLearningItems();

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
    this.getGaps();
  }

  checkAnswer() {
    this.indexesOfGaps = new Array();
    this.getIndexesOfGaps();
    const tab = this.splt(this.separators, this.Item.sentenceWithGaps);
    const tabCorrect = this.splt(this.separators, this.Item.correctSentence);
    console.log(this.indexesOfGaps.length);
    for (let i = 0; i < this.indexesOfGaps.length; i++) {
      
 
      if (this.answers[i] === tabCorrect[this.indexesOfGaps[i]]) {

      }
    }

    this.CorrectVisible = true;
  }
  nextQuestion() {
    this.answers = [" ", " ", " "];
    if (this.indx < this.Items.length - 1) {
      this.CorrectVisible = false;
      this.indx++;
      this.showNewItem();
    } else {
      this.CorrectVisible = false;
      this.indx = 0;
      this.getLearningItems();
      this.showNewItem();
    }
  }
  getIndexesOfGaps() {
    const tab = this.splt(this.separators, this.Item.sentenceWithGaps);
    for (let i = 0; i < tab.length; i++) {
      this.indexesOfGaps = new Array();

      if (tab[i].includes("_")) {
        this.indexesOfGaps.push(i);
      }
    }

  }

  getGaps() {
    this.gaps = this.splt(this.separators, this.Item.sentenceWithGaps).filter(x => x.includes('_'));
  }

  splt(signs: string[], sentence: string): string[] {
    for (let s in signs) {
      sentence = sentence.split(signs[s]).join('#');
    }
    return sentence.split('#');
  }



}
