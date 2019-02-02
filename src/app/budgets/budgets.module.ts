import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';
import { BudgetListComponent } from './components/budget-list/budget-list.component';

@NgModule({
  declarations: [DashboardComponent, BudgetListComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class BudgetsModule { }
