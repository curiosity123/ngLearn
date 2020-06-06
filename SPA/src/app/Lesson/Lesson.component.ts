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
    this.getGaps();
    var compare = this.Item.sentenceWithGaps;
    for (let g in this.gaps) {
      compare = compare.replace(this.gaps[g], this.answers[g].replace(" ","").replace(" ","").replace(" ","").replace(" ",""));
    }
    if(compare == this.Item.correctSentence)
    {
      console.log("Correct!!!");
    }
    else{
      console.log("DUPA!!!");
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
