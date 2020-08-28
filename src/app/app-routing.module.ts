import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainListComponent } from './train-list/train-list.component';
import { TrainDetailsComponent } from './train-details/train-details.component';


const routes: Routes = [
  {
    path: 'train-summary',
    component: TrainListComponent,
    data: { title: 'Train List' }
  },
  {
    path: 'train-details/:id',
    component: TrainDetailsComponent,
    data: { title: 'Train Details' }
  },
  {
    path: 'train-details',
    component: TrainDetailsComponent,
    data: { title: 'Train List' }
  },

  { path: '',
    redirectTo: '/train-summary',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
