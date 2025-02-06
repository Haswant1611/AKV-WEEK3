// dashboard.routing.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FileUploadsComponent } from './components/file-uploads/file-uploads.component';

const routes: Routes = [
  {
    path: '', // Default route for the dashboard
    component: DashboardComponent,
    children:[{
      path:'file-uploads',
      component:FileUploadsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
