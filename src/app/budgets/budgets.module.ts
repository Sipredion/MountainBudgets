import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BudgetDetailComponent } from './components/budget-detail/budget-detail.component';

@NgModule({
  declarations: [DashboardComponent, BudgetListComponent, AddBudgetComponent, BudgetDetailComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class BudgetsModule { }
