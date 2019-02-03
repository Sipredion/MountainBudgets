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

  newBudgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public budgetService: BudgetService) {
  }

  ngOnInit() {
    this.newBudgetForm = this.formBuilder.group({
      name: ['', Validators.required],
      budgetType: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  createNewBudget(form: FormGroup) {
    if (!form.hasError('required')) {
      const budget = new Budget(form.value);
      budget.createdOn = new Date();
      budget.uid = this.user.uid;
      console.log(budget);
      this.budgetService.addBudget(Object.assign({}, budget))
        .then((ref: DocumentReference) => {
          this.router.navigateByUrl(`/budget/detail/${ref.id}`);
          this.closeDialog();
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
