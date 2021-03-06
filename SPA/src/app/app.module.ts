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
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonComponent } from './Lesson/Lesson.component';
import 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Login/Login.component';
import { AuthService } from '../services/auth.service';
import { HomeComponent } from './Home/Home.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Register/Register.component';
import { CreateLearningSetComponent } from './Create-learning-set/Create-learning-set.component';
import { FormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LessonSummaryComponent } from './lesson-summary/lesson-summary.component';
import { StatsComponent } from './Stats/Stats.component';
import { SettingsComponent } from './Settings/Settings.component';
import {HelpComponent} from './Help/Help.component';
import { SearchingModuleComponent } from './searching-module/searching-module.component';
import { ConfirmDialogComponent } from './ConfirmDialog/ConfirmDialog.component';
import { ItemsEditorComponent } from './Items-editor/Items-editor.component';
import { NewItemPopupComponent } from './new-item-popup/new-item-popup.component';
import {MatPaginatorModule} from '@angular/material/paginator';

export function tokenGetter() {
   return localStorage.getItem('token');
   console.log('got token');
 }

@NgModule({
   declarations: [
      AppComponent,
      HelpComponent,
      SettingsComponent,
      LessonComponent,
      LoginComponent,
      HomeComponent,
      RegisterComponent,
      CreateLearningSetComponent,
      LessonSummaryComponent,
      StatsComponent,
      SearchingModuleComponent,
      ConfirmDialogComponent,
      ItemsEditorComponent,
      NewItemPopupComponent
   ],
   imports: [
      FormsModule,
      MatExpansionModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      TooltipModule.forRoot(),
      MatCardModule,
      MatListModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatSidenavModule,
      MatPaginatorModule,
      MatMenuModule,
      MatProgressBarModule,
      MatSliderModule,
      MatStepperModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatGridListModule,
      RouterModule,
      MatDialogModule,
      FontAwesomeModule,
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000']
         }
}),

   ],
   providers: [
      AuthService,
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
