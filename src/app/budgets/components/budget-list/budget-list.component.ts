import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAuthService} from '../../../users/services/user-auth.service';
import {Budget} from '../../models/budget.model';
import {BudgetService} from '../../services/budget.service';
import {Subscription} from 'rxjs';
import {UserProfile} from '../../../users/models/user-profile.model';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit, OnDestroy {

  usrSubscription: Subscription;
  user: UserProfile;

  budgetList: Array<Budget> = [];

  constructor(public authService: UserAuthService,
              public budgetService: BudgetService) {
  }

  ngOnInit() {
    this.authService.userProfile.subscribe(user => {
      if (user) {
        this.user = user;
        this.budgetService.getAllBudgetsByUser(this.user.uid);
      }
    });
  }

  ngOnDestroy() {
    this.usrSubscription.unsubscribe();
  }

}
