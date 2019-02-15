import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'budget',
    loadChildren: './budgets/budgets.module#BudgetsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/budget/list'
  },
  {
    path: '**',
    redirectTo: '/user/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
