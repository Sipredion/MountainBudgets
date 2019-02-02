import {BudgetDuration} from './budget-duration.enum';

export class Budget {
  budgetId: string;
  createdOn: Date;
  duration: BudgetDuration;
  expenses: Array<string>; // Reference to expenseIds.
  income: Array<string>; // Reference to incomeIds.
  uid: string;

  constructor(options: any) {
    this.budgetId = options && options.budgetId;
    this.createdOn = options && options.createdOn;
    this.duration = options && options.duration;
    this.expenses = options && options.expenses || [];
    this.income = options && options.income || [];
    this.uid = options && options.uid;
  }
}
