import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAuthService} from '../../../users/services/user-auth.service';
import {Budget} from '../../models/budget.model';
import {BudgetService} from '../../services/budget.service';
import {Subscription} from 'rxjs';
import {UserProfile} from '../../../users/models/user-profile.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit, OnDestroy {

  usrSubscription: Subscription;
  user: UserProfile;

  dialogRef: MatDialogRef<any>;
  dialogConfig: MatDialogConfig;

  selecedBudget: Budget;

  constructor(public authService: UserAuthService,
              public budgetService: BudgetService,
              private dialogService: MatDialog) {
  }

  ngOnInit() {
    this.usrSubscription = this.authService.userProfile.subscribe(user => {
      if (user) {
        this.user = user;
        this.budgetService.getAllBudgetsByUser(this.user.uid);
      }
    });
  }

  ngOnDestroy() {
    this.usrSubscription.unsubscribe();
  }

  openBudgetDialog(template, data?: Budget) {
    this.dialogConfig = {
      width: '90%',
    };
    if (data) {
      this.selecedBudget = data;
    }
    this.dialogRef = this.dialogService.open(template, this.dialogConfig);
  }

  deleteBudget(id: string) {
    this.budgetService.deleteBudget(id);
  }

}
