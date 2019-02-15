import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Expense} from '../../models/expense.model';
import {BudgetExpenseService} from '../../services/budget-expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {

  @Input() budgetId: string;
  @Input() dialogRef: MatDialogRef<any>;
  @Input() expense?: Expense;

  @Output() clearExpense = new EventEmitter();

  loading: boolean;

  expenseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public expenseService: BudgetExpenseService) {
  }

  ngOnInit() {
    if (this.expense) {
      this.expenseForm = this.formBuilder.group({
        name: [this.expense.name, Validators.required],
        amount: [this.expense.amount, Validators.required],
        // categoryName: [this.expense.categoryName, Validators.required],
        // dueDate: [this.expense.dueDate],
        // isPaid: [this.expense.isPaid],
        // isRecurring: [this.expense.isRecurring],
      });
    } else {
      this.expenseForm = this.formBuilder.group({
        name: ['', Validators.required],
        amount: [0, Validators.required],
        // categoryName: ['', Validators.required],
        // dueDate: [''],
        // isPaid: [false],
        // isRecurring: [false],
      });
    }
  }

  ngOnDestroy() {
    if (this.expense) {
      this.clearExpense.emit();
    }
  }

  createNewExpense(form: FormGroup) {
    this.loading = true;
    let expense: Expense;
    if (!this.expense) {
      expense = new Expense(form.value);
      expense.budgetId = this.budgetId;
      expense.categoryId = '';
      expense.id = '';
      this.expenseService.addExpense(Object.assign({}, expense))
        .then(() => {
          this.closeDialog();
          this.loading = false;
        });
    } else {
      expense = form.value;
      this.expenseService.updateExpense(this.expense.id, expense)
        .then(() => {
          this.closeDialog();
          this.loading = false;
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
