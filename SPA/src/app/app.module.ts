import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonComponent } from './Lesson/Lesson.component';
import 'rxjs';


@NgModule({
   declarations: [
      AppComponent,
      LessonComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      TooltipModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
