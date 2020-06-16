import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './Stats/Stats.component';
import { HomeComponent } from './Home/Home.component';
import { SettingsComponent } from './Settings/Settings.component';
import { HelpComponent } from './Help/Help.component';
import { LessonSummaryComponent } from './lesson-summary/lesson-summary.component';
import { LessonComponent } from './Lesson/Lesson.component';


const routes: Routes = [
  { path: 'stats-component', component: StatsComponent },
  { path: 'home-component', component: HomeComponent },
  { path: 'settings-component', component: SettingsComponent },
  { path: 'help-component', component: HelpComponent },
  { path: 'lesson-component', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
