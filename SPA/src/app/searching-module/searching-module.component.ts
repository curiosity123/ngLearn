import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { CoursesCollection as CoursessCollection } from 'src/models/CoursesCollection';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-searching-module',
  templateUrl: './searching-module.component.html',
  styleUrls: ['./searching-module.component.css']
})
export class SearchingModuleComponent implements OnInit {

  CoursesCollection: CoursessCollection[];
  step = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private contentService: ContentService) { }

  ngOnInit() {
    this.GetAllCourses();
  }

  setStep(index: number) {
    this.step = index;
  }

  GetAllCourses() {
    this.contentService.GetAllCourses().subscribe((response: CoursessCollection[]) => {
      this.CoursesCollection = response;
    });
  }


  AddToUsersCollection(courseId: string) {
    this.contentService.AddToUsersCollection(courseId).subscribe(
      x => {
        this.GetAllCourses();
      },
      error => console.log(error)
    );

  }
}
