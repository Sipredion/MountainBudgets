import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetService} from '../../services/budget.service';
import {Budget} from '../../models/budget.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit, OnDestroy {

  budgetSubscription: Subscription;
  selectedBudget: Budget;

  constructor(private budgetService: BudgetService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const budgetId = this.route.snapshot.params['id'];
    this.budgetSubscription = this.budgetService.getBudgetById(budgetId).subscribe(budget => {
      this.selectedBudget = budget;
    });
  }

  ngOnDestroy() {
    this.budgetSubscription.unsubscribe();
  }

}
