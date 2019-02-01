import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class BudgetsModule { }
