import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IncomeStream} from '../../models/income-stream.model';
import {BudgetIncomeService} from '../../services/budget-income.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  @Input() budgetId: string;
  @Input() dialogRef: MatDialogRef<any>;

  incomeStreamForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public incomeService: BudgetIncomeService) {
  }

  ngOnInit() {
    this.incomeStreamForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      type: ['', Validators.required],
      isRecurring: [false]
    });
  }

  createNewIncomeStream(form: FormGroup) {
    const incomeStream = new IncomeStream(form.value);
    incomeStream.budgetId = this.budgetId;
    this.incomeService.addIncomeStream(Object.assign({}, incomeStream))
      .then(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
