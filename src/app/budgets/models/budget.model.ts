import {BudgetDuration} from './budget-duration.enum';

export class Budget {
  budgetType: string;
  createdOn: Date;
  duration: BudgetDuration;
  expenses?: Array<string>; // Reference to expenseIds.
  income?: Array<string>; // Reference to incomeIds.
  name: string;
  uid: string;

  constructor(options: any) {
    this.budgetType = options && options.budgetType;
    this.createdOn = options && options.createdOn;
    this.duration = options && options.duration;
    this.expenses = options && options.expenses || [];
    this.income = options && options.income || [];
    this.name = options && options.name;
    this.uid = options && options.uid;
  }
}
