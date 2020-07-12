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
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';

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
    private router: Router, private contentService: ContentService) { }

  ngOnInit() {
    this.getCourses();
  }




  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  startLearning(set: any) {
    console.log(set.name);
    this.router.navigate(['/lesson-component', set.id]);
  }

  deleteThisCourse(CourseId: number) {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.contentService.DeleteCourseFromBoard(this.user.id, CourseId.toString()).subscribe((
      response: string) => {
      console.log(response);
      this.getCourses();
    });

  }

  getCourses() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.contentService.GetCoursesForUser(this.user.id)
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

  resetProgress(setId: number) {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.contentService.ResetProgress(this.user.id, setId.toString()).subscribe(
      x => {
        console.log(x);
        this.getCourses();
      },
      error => console.log(error)
    );

  }


  getProgress(courseId: string) {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.contentService.GetProgress(this.user.id, courseId);
  }
}

