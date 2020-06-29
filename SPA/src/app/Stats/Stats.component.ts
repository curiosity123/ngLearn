import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { CreateLearningSetComponent } from '../Create-learning-set/Create-learning-set.component';
import { LearningItem } from 'src/models/LearningItem';
import { LearningSet } from 'src/models/LearningSet';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summary } from '@angular/compiler';
import { Progress } from 'src/models/Progress';

@Component({
  selector: 'app-stats',
  templateUrl: './Stats.component.html',
  styleUrls: ['./Stats.component.css']
})
export class StatsComponent implements OnInit {


  user: User;
  learningSets: LearningSet[];
  summaries: Array<Progress>;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }




  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  startLearning(set: any) {
    console.log(set.name);
    this.router.navigate(['/lesson-component']);
  }

  deleteThisCourse(id: number) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(id);
    this.http.delete('http://localhost:5000/api/' + this.user.id + '/content/' + id + '/RemoveCourseFromMyBoard', {}).subscribe((
      response: string) => {
      console.log(response);
      this.getCourses();
    });

  }

  getCourses() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.http.get('http://localhost:5000/api/' + this.user.id + '/content/GetMyCourses')
      .subscribe((response: LearningSet[]) => {
        ///
        this.learningSets = response;
        this.summaries = new Array<Progress>();
        for (let i = 0; i < this.learningSets.length; i++) {
          this.getProgress(this.learningSets[i].id.toString()).subscribe((res: Progress) => {
            this.summaries.push(res);

          });

        }
        ///
      });
  }

resetProgress(setId:number)
{

  this.user = JSON.parse(localStorage.getItem('user'));

  this.http.post('http://localhost:5000/api/' + this.user.id + '/content/' + setId.toString() + '/resetProgress' , {}) .subscribe(
    x => {
      console.log(x);
      this.getCourses();
    },
    error => console.log(error)
  );
//{LearningItemId}/ResetProgress
}
  

  getProgress(courseId: string) {
    this.user = JSON.parse(localStorage.getItem('user'));

    return this.http.get('http://localhost:5000/api/' + this.user.id + '/content/' + courseId + '/getProgress');

  }
}

