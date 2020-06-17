import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './Stats.component.html',
  styleUrls: ['./Stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.learningSets = [
      { "name": "200commonphrasals ", "desc": "some desc2" },
      { "name": "300commonphrasals ", "desc": "some desc3" },
      { "name": "400commonphrasals ", "desc": "some desc4" },
    ];
  }

  step = 0;
  learningSets: { name: string, desc: string }[] = [
    { "name": "200commonphrasals ", "desc": "some desc2" },
    { "name": "300commonphrasals ", "desc": "some desc3" },
    { "name": "400commonphrasals ", "desc": "some desc4" },
  ];



  setStep(index: number) {
    this.step = index;
  }

  startLearning(set: any) {
    console.log(set.name);
    this.router.navigate(['/lesson-component']);
  }
}

