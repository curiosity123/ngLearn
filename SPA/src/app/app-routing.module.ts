import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './Stats/Stats.component';
import { HomeComponent } from './Home/Home.component';
import { SettingsComponent } from './Settings/Settings.component';
import { HelpComponent } from './Help/Help.component';
import { LessonSummaryComponent } from './lesson-summary/lesson-summary.component';
import { LessonComponent } from './Lesson/Lesson.component';
import { SearchingModuleComponent } from './searching-module/searching-module.component';
import { CreateLearningSetComponent } from './Create-learning-set/Create-learning-set.component';
import { ItemsEditorComponent } from './Items-editor/Items-editor.component';


const routes: Routes = [
  { path: 'stats-component', component: StatsComponent },
  { path: 'home-component', component: HomeComponent },
  { path: 'settings-component', component: SettingsComponent },
  { path: 'help-component', component: HelpComponent },
  { path: 'lesson-component/:id', component: LessonComponent },
  { path: 'searchingModule-component', component: SearchingModuleComponent },
  { path: 'create-learning-set-component', component: CreateLearningSetComponent },
  { path: 'Items-editor/:id', component: ItemsEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
