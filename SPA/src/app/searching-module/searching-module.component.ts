import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { LearningSet } from 'src/models/LearningSet';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-searching-module',
  templateUrl: './searching-module.component.html',
  styleUrls: ['./searching-module.component.css']
})
export class SearchingModuleComponent implements OnInit {

  user: User;
  learningSets: LearningSet[];

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getLearningSets();
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }


  getLearningSets() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.http.get('http://localhost:5000/api/' + this.user.id + '/content/GetAllCourses')
      .subscribe((response: LearningSet[]) => {
        this.learningSets = response;
      });
    }


  AddToMyBoard(id: string) {
    console.log(id);
    this.user = JSON.parse(localStorage.getItem('user'));

    this.http.post('http://localhost:5000/api/' + this.user.id + '/content/' + id + '/AddCourseToBoard' , {}) .subscribe(
      x => {
        console.log(x);
        this.getLearningSets();
      },
      error => console.log(error)
    );

  }
}
