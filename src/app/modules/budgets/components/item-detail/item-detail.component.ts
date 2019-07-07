import {Component, Input, OnInit} from '@angular/core';
import {IncomeStream} from '../../models/income-stream.model';
import {Expense} from '../../models/expense.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  @Input() selectedItem: (IncomeStream | Expense);

  constructor() {
  }

  ngOnInit() {
  }

}
