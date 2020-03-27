import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HistoricComponent } from './historic/historic.component';
import { TaskComponent } from './task/task.component';
import { ResponsableComponent } from './responsable/responsable.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: 'responsable', component: ResponsableComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'historic', component: HistoricComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
