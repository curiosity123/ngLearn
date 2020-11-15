import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/services/content.service';
import { AccountService } from 'src/services/account.service';
import { Course } from 'src/models/Course';

@Component({
  selector: 'app-searching-module',
  templateUrl: './searching-module.component.html',
  styleUrls: ['./searching-module.component.css']
})
export class SearchingModuleComponent implements OnInit {

  Courses: Course[];
  step = 0;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.GetAllCourses();
  }

  setStep(index: number) {
    this.step = index;
  }

  GetAllCourses() {
    this.contentService.GetAllCourses().subscribe((response: Course[]) => {
      this.Courses = response;
    });
  }


  AddToUsersCollection(courseId: string) {
    this.accountService.AddCourseToUsersCollection(courseId).subscribe(
      x => {
        this.GetAllCourses();
      },
      error => console.log(error)
    );

  }
}
