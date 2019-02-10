import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Expense} from '../../models/expense.model';
import {BudgetExpenseService} from '../../services/budget-expense.service';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';

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

  expenseForm: FormGroup;

  numberMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    allowNegative: true
  });

  constructor(private formBuilder: FormBuilder,
              public expenseService: BudgetExpenseService) {
  }

  ngOnInit() {
    this.numberMask = {mask: this.numberMask};

    if (this.expense) {
      this.expenseForm = this.formBuilder.group({
        name: [this.expense.name, Validators.required],
        amount: [this.expense.amount, Validators.required],
        categoryName: [this.expense.categoryName, Validators.required],
        dueDate: [this.expense.dueDate],
        isPaid: [this.expense.isPaid],
        isRecurring: [this.expense.isRecurring],
      });
    } else {
      this.expenseForm = this.formBuilder.group({
        name: ['', Validators.required],
        amount: [0, Validators.required],
        categoryName: ['', Validators.required],
        dueDate: [''],
        isPaid: [false],
        isRecurring: [false],
      });
    }
  }

  ngOnDestroy() {
    if (this.expense) {
      this.clearExpense.emit();
    }
  }

  createNewExpense(form: FormGroup) {
    let expense: Expense;
    if (!this.expense) {
      expense = new Expense(form.value);
      expense.budgetId = this.budgetId;
      expense.categoryId = '';
      expense.id = '';
      this.expenseService.addExpense(Object.assign({}, expense))
        .then(() => {
          this.closeDialog();
        });
    } else {
      expense = form.value;
      this.expenseService.updateExpense(this.expense.id, expense)
        .then(() => {
          this.closeDialog();
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
