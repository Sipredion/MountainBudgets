import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Expense} from '../../models/expense.model';
import {BudgetExpenseService} from '../../services/budget-expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  @Input() budgetId: string;
  @Input() dialogRef: MatDialogRef<any>;

  expenseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public expenseService: BudgetExpenseService) {
  }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      categoryName: ['', Validators.required],
      dueDate: [''],
      isAutomatic: [false],
      isPaid: [false],
      isRecurring: [false],
      type: ['', Validators.required]
    });
  }

  createNewExpense(form: FormGroup) {
    const expense = new Expense(form.value);
    expense.budgetId = this.budgetId;
    expense.categoryId = '';
    console.log(expense);
    this.expenseService.addExpense(Object.assign({}, expense))
      .then(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
