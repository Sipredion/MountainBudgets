export class Expense {
  id: string;
  amount: number;
  budgetId: string;
  categoryId: string;
  categoryName: string;
  dueDate: Date;
  isAutomatic: boolean;
  isPaid: boolean;
  isRecurring: boolean;
  name: string;
  type: string;

  constructor(options: any) {
    this.id = options && options.id;
    this.amount = options && options.amount;
    this.budgetId = options && options.budgetId;
    this.categoryId = options && options.categoryId;
    this.categoryName = options && options.categoryName;
    this.dueDate = options && options.dueDate;
    this.isAutomatic = options && options.isAutomatic;
    this.isPaid = options && options.isPaid;
    this.isRecurring = options && options.isRecurring;
    this.name = options && options.name;
    this.type = options && options.type;
  }
}
