import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAuthService} from '../../../users/services/user-auth.service';
import {Budget} from '../../models/budget.model';
import {BudgetService} from '../../services/budget.service';
import {Subscription} from 'rxjs';
import {UserProfile} from '../../../users/models/user-profile.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {DocumentChangeAction} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit, OnDestroy {

  usrSubscription: Subscription;
  budgetSubscription: Subscription;

  user: UserProfile;
  budgets: Array<DocumentChangeAction<Budget>> = [];

  dialogRef: MatDialogRef<any>;
  dialogConfig: MatDialogConfig;

  selectedBudget: Budget;

  constructor(public authService: UserAuthService,
              public budgetService: BudgetService,
              private dialogService: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.usrSubscription = this.authService.userProfile.subscribe(user => {
      if (user) {
        this.user = user;
        this.budgetService.getAllBudgetsByUser(this.user.uid);
        this.budgetSubscription = this.budgetService.userBudgets.subscribe(budgets => {
          this.budgets = budgets;
        });
      }
    });
  }

  ngOnDestroy() {
    this.usrSubscription.unsubscribe();
  }

  openBudget(id: string) {
    this.router.navigateByUrl(`/budget/detail/${id}`);
  }

  openBudgetDialog(template, data?: Budget) {
    this.dialogConfig = {
      width: '90%',
    };
    if (data) {
      this.selectedBudget = data;
    }
    this.dialogRef = this.dialogService.open(template, this.dialogConfig);
  }

  deleteBudget(id: string) {
    this.budgetService.deleteBudget(id);
  }

}
