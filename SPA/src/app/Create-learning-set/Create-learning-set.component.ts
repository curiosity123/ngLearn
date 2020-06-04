import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-Create-learning-set',
  templateUrl: './Create-learning-set.component.html',
  styleUrls: ['./Create-learning-set.component.css']
})
export class CreateLearningSetComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}