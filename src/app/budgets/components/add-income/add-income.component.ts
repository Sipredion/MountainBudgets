import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeStream} from '../../models/income-stream.model';
import {BudgetIncomeService} from '../../services/budget-income.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit, OnDestroy {

  @Input() budgetId: string;
  @Input() dialogRef: MatDialogRef<any>;
  @Input() income?: IncomeStream;

  @Output() clearIncome = new EventEmitter();

  incomeStreamForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public incomeService: BudgetIncomeService) {
  }

  ngOnInit() {
    if (this.income) {
      this.incomeStreamForm = this.formBuilder.group({
        name: [this.income.name, Validators.required],
        amount: [this.income.amount, Validators.required],
        type: [this.income.type, Validators.required],
        isRecurring: [this.income.isRecurring]
      });
    } else {
      this.incomeStreamForm = this.formBuilder.group({
        name: ['', Validators.required],
        amount: [0, Validators.required],
        type: ['', Validators.required],
        isRecurring: [false]
      });
    }
  }

  ngOnDestroy() {
    if (this.income) {
      this.clearIncome.emit();
    }
  }

  createNewIncomeStream(form: FormGroup) {
    let incomeStream: IncomeStream;
    if (!this.income) {
      incomeStream = new IncomeStream(form.value);
      incomeStream.budgetId = this.budgetId;
      this.incomeService.addIncomeStream(Object.assign({}, incomeStream))
        .then(() => {
          this.closeDialog();
        });
    } else {
      incomeStream = form.value;
      this.incomeService.updaeIncomeStream(this.income.id, incomeStream)
        .then(() => {
          this.closeDialog();
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
