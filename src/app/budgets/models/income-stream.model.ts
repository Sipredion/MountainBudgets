export class IncomeStream {
  amount: number;
  budgetId: string;
  isRecurring: boolean;
  name: string;
  type: string;

  constructor(options: any) {
    this.amount = options && options.amount;
    this.budgetId = options && options.budgetId;
    this.isRecurring = options && options.isRecurring;
    this.name = options && options.name;
    this.type = options && options.type;
  }
}
