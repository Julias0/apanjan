import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./menus/menus.module').then( m => m.MenusPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApanjanRoutingModule { }
