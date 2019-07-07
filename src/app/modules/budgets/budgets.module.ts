import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BudgetsRoutingModule} from './budgets-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {BudgetListComponent} from './components/budget-list/budget-list.component';
import {AddBudgetComponent} from './components/add-budget/add-budget.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BudgetDetailComponent} from './components/budget-detail/budget-detail.component';
import {AddIncomeComponent} from './components/add-income/add-income.component';
import {AddExpenseComponent} from './components/add-expense/add-expense.component';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BudgetListComponent,
    AddBudgetComponent,
    BudgetDetailComponent,
    AddIncomeComponent,
    AddExpenseComponent,
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class BudgetsModule {
}
