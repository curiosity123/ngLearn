import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonComponent } from './Lesson/Lesson.component';
import 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Login/Login.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './Home/Home.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Register/Register.component';
import { CreateLearningSetComponent } from './Create-learning-set/Create-learning-set.component';

export function tokenGetter() {
   return localStorage.getItem('token');
   console.log('got token');
 }

@NgModule({
   declarations: [
      AppComponent,
      LessonComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      CreateLearningSetComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      TooltipModule.forRoot(),
      MatCardModule,
      BrowserAnimationsModule,
      MatSidenavModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatGridListModule,
      RouterModule,
      MatDialogModule,
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000']
         }
       })
   ],
   providers: [
      AuthService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
