import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Budget} from '../models/budget.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetsCollection: AngularFirestoreCollection<Budget>;
  userBudgets: Observable<Budget[]>;

  constructor(private data: AngularFirestore) {
    this.budgetsCollection = data.collection<Budget>('budgets');
  }

  getAllBudgetsByUser(uid: string): Observable<Budget[]> {
    return this.userBudgets = this.data.collection<Budget>(
      'budgets',
      ref => ref.where('uid', '==', uid)
    ).valueChanges();
  }
}
