import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Budget} from '../models/budget.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private personalBudgetsSrc = new BehaviorSubject<DocumentChangeAction<Budget>[]>(null);
  personalBudgets = this.personalBudgetsSrc.asObservable();

  private houseHoldBudgetsSrc = new BehaviorSubject<DocumentChangeAction<Budget>[]>(null);
  houseHoldBudgets = this.houseHoldBudgetsSrc.asObservable();

  private businessBudgetsSrc = new BehaviorSubject<DocumentChangeAction<Budget>[]>(null);
  businessBudgets = this.businessBudgetsSrc.asObservable();

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
    ).snapshotChanges().pipe(
      tap(budgets => {
        const personal = budgets.filter(p_budget => p_budget.payload.doc.data().budgetType === 'Personal');
        this.personalBudgetsSrc.next(personal);
        const houseHold = budgets.filter(h_budget => h_budget.payload.doc.data().budgetType === 'Household');
        this.houseHoldBudgetsSrc.next(houseHold);
        const business = budgets.filter(b_budget => b_budget.payload.doc.data().budgetType === 'Business');
        this.businessBudgetsSrc.next(business);
      })
    );
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

  updateBudget(id: string, budget: Budget) {
    return this.budgetsCollection.doc(id).update(Object.assign({}, budget))
      .catch(error => {
        console.log(error);
      });
  }

  deleteBudget(id: string): Promise<void | DocumentReference> {
    return this.budgetsCollection.doc(id).delete()
      .catch(error => {
        console.log(error);
      });
  }
}
