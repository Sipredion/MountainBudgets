import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {BudgetService} from '../../services/budget.service';
import {Budget} from '../../models/budget.model';
import {UserProfile} from '../../../users/models/user-profile.model';
import {Router} from '@angular/router';
import {DocumentReference} from '@angular/fire/firestore';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  @Input() user: UserProfile;
  @Input() dialogRef: MatDialogRef<any>;
  @Input() budget?: Budget;

  newBudgetForm: FormGroup;

  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public budgetService: BudgetService) {
  }

  ngOnInit() {
    if (this.budget) {
      this.newBudgetForm = this.formBuilder.group({
        name: [this.budget.name, Validators.required],
        budgetType: [this.budget.budgetType, Validators.required],
        duration: [this.budget.duration, Validators.required]
      });
    } else {
      this.newBudgetForm = this.formBuilder.group({
        name: ['', Validators.required],
        budgetType: ['', Validators.required],
        duration: ['', Validators.required]
      });
    }
  }

  createNewBudget(form: FormGroup) {
    this.loading = true;
    if (this.budget) {
      if (!form.hasError('required')) {
        this.budgetService.updateBudget(this.budget.id, Object.assign({}, form.value))
          .then(() => {
            this.closeDialog();
            this.loading = false;
          });
      }
    } else {
      if (!form.hasError('required')) {
        const budget = new Budget(form.value);
        budget.createdOn = new Date();
        budget.uid = this.user.uid;
        budget.id = '';
        this.budgetService.addBudget(Object.assign({}, budget))
          .then((ref: DocumentReference) => {
            budget.id = ref.id;
            this.budgetService.updateBudget(budget.id, budget)
              .then(() => {
                this.router.navigateByUrl(`/budget/detail/${ref.id}`);
                this.closeDialog();
                this.loading = false;
              });
          });
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
