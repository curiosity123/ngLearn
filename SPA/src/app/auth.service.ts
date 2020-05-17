import { Injectable } from '@angular/core';
import { LearningItem } from 'src/models/LearningItem';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { 
  
}




getLearningItems()
{
  this.http.get('http://localhost:5000/api/content')
  .subscribe((response: LearningItem[]) => {
    this.Items = response;
    this.Item = this.Items[0];
  })
}
}
