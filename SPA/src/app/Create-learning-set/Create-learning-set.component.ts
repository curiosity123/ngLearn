import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-Create-learning-set',
  templateUrl: './Create-learning-set.component.html',
  styleUrls: ['./Create-learning-set.component.css']
})
export class CreateLearningSetComponent implements OnInit {

   typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
 
  }

}
