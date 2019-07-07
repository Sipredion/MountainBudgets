import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BudgetListComponent} from './components/budget-list/budget-list.component';
import {BudgetDetailComponent} from './components/budget-detail/budget-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'list', component: BudgetListComponent},
      {path: 'detail/:id', component: BudgetDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule {
}
