import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Budget} from '../models/budget.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetsCollection: AngularFirestoreCollection<Budget>;
  userBudgets: Observable<DocumentChangeAction<Budget>[]>;
  selectedBudget: Observable<Budget>;

  constructor(private data: AngularFirestore) {
    this.budgetsCollection = data.collection<Budget>('budgets');
  }

  getAllBudgetsByUser(uid: string): Observable<DocumentChangeAction<Budget>[]> {
    return this.userBudgets = this.data.collection<Budget>(
      'budgets',
      ref => ref.where('uid', '==', uid)
    ).snapshotChanges();
  }

  getBudgetById(id: string) {
    return this.selectedBudget = this.budgetsCollection.doc<Budget>(id).valueChanges();
  }

  addBudget(budget: Budget): Promise<void | DocumentReference> {
    return this.budgetsCollection.add(budget)
      .catch(error => {
        console.log(error);
      });
  }
}
