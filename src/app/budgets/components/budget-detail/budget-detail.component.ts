import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetService} from '../../services/budget.service';
import {Budget} from '../../models/budget.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {BudgetIncomeService} from '../../services/budget-income.service';
import {BudgetExpenseService} from '../../services/budget-expense.service';
import {IncomeStream} from '../../models/income-stream.model';
import {Expense} from '../../models/expense.model';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit, OnDestroy {

  budgetSubscription: Subscription;
  incomeStreamSubscription: Subscription;
  expenseSubscription: Subscription;
  incomeTotalSubscription: Subscription;
  expenseTotalSubscription: Subscription;

  selectedBudget: Budget;

  budgetIncomeStreams: IncomeStream[] = [];
  budgetIncomeTotal: number;

  budgetExpenses: Expense[] = [];
  budgetExpenseTotal: number;

  constructor(private budgetService: BudgetService,
              public incomeService: BudgetIncomeService,
              public expenseService: BudgetExpenseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const budgetId = this.route.snapshot.params['id'];
    this.budgetSubscription = this.budgetService.getBudgetById(budgetId).subscribe(budget => {
      this.selectedBudget = budget;
      this.fetchAllIncomeForBudget(budgetId);
      this.fetchAllExpenseForBudget(budgetId);
    });
  }

  ngOnDestroy() {
    this.budgetSubscription.unsubscribe();
    this.incomeStreamSubscription.unsubscribe();
    this.incomeTotalSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
    this.expenseTotalSubscription.unsubscribe();
  }

  fetchAllIncomeForBudget(budgetId: string) {
    this.incomeStreamSubscription = this.incomeService.getAllIncomeStreamsByBudget(budgetId).subscribe(incomeStreams => {
      this.budgetIncomeStreams = incomeStreams.map(incomeStream => incomeStream.payload.doc.data());
      this.incomeTotalSubscription = this.incomeService.budgetIncomeTotal.subscribe(incomeTotal => {
        this.budgetIncomeTotal = incomeTotal;
      });
    });
  }

  fetchAllExpenseForBudget(budgetId) {
    this.expenseSubscription = this.expenseService.getAllExpensesByBudget(budgetId).subscribe(expenses => {
      this.budgetExpenses = expenses.map(expense => expense.payload.doc.data());
      this.expenseTotalSubscription = this.expenseService.budgetExpenseTotal.subscribe(expenseTotal => {
        this.budgetExpenseTotal = expenseTotal;
      });
    });
  }

  deriveBudgetAmountRemaining(incomeTotal: number, expenseTotal: number) {
    return incomeTotal - expenseTotal;
  }

}
