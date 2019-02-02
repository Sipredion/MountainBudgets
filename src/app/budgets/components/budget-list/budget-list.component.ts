import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../../users/services/user-auth.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  constructor(public authService: UserAuthService) {
  }

  ngOnInit() {
  }

}
