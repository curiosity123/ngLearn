import { Component, OnInit } from '@angular/core';
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
  summaries: Progress;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getCourses();
    // this.learningSets = [
    //   { "name": "200commonphrasals ", "desc": "some desc2" },
    //   { "name": "300commonphrasals ", "desc": "some desc3" },
    //   { "name": "400commonphrasals ", "desc": "some desc4" },
    // ];
  }


  // learningSets: { name: string, desc: string }[] = [
  //   { "name": "200commonphrasals ", "desc": "some desc2" },
  //   { "name": "300commonphrasals ", "desc": "some desc3" },
  //   { "name": "400commonphrasals ", "desc": "some desc4" },
  // ];


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
        this.learningSets = response;
this.learningSets.forEach(x=>
  {
    this.getProgress(x.id.toString());
  })
      });
  }

  getProgress(courseId: string) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.http.get('http://localhost:5000/api/' + this.user.id + '/content/' + courseId + '/getProgress')
      .subscribe((response: Progress) => {
        this.summaries = response;
      });
  }
}

