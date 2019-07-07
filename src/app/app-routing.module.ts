import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'budget',
    loadChildren: () => import('./modules/budgets/budgets.module').then(m => m.BudgetsModule)
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
