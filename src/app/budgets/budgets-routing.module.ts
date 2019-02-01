import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BudgetListComponent} from './components/budget-list/budget-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'list', component: BudgetListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule {
}
