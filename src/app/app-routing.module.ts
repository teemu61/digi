import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  {
    path: 'summary',
    component: SummaryComponent,
    data: { title: 'Train List' }
  },
  { path: '',
    redirectTo: '/summary',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
