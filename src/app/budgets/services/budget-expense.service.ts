import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Expense} from '../models/expense.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetExpenseService {

  private budgetExpenseTotalSrc = new BehaviorSubject<number>(undefined);
  budgetExpenseTotal = this.budgetExpenseTotalSrc.asObservable();

  private expenseCollection: AngularFirestoreCollection<Expense>;
  expenseList: Observable<DocumentChangeAction<Expense>[]>;

  constructor(private data: AngularFirestore) {
    this.expenseCollection = data.collection('Expenses');
  }

  getAllExpensesByBudget(budgetId: string): Observable<DocumentChangeAction<Expense>[]> {
    return this.expenseList = this.data.collection<Expense>(
      'Expenses',
      ref => ref.where('budgetId', '==', budgetId
      )
    ).snapshotChanges().pipe(
      tap(expenses => {
        const budgetExpenseAmounts = expenses.map(expense => expense.payload.doc.data().amount);
        const budgetExpenseTotal = this.reduceArray(budgetExpenseAmounts);
        this.budgetExpenseTotalSrc.next(budgetExpenseTotal);
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  addExpense(expense: Expense): Promise<void | DocumentReference> {
    return this.expenseCollection.add(expense)
      .then(ref => {
        this.expenseCollection.doc(ref.id).update({id: ref.id})
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateExpense(id: string, expense: Expense): Promise<void | DocumentReference> {
    return this.expenseCollection.doc(id).update(expense)
      .catch(error => {
        console.log(error);
      });
  }

  deleteExpense(id: string): Promise<void | DocumentReference> {
    return this.expenseCollection.doc(id).delete()
      .catch(error => {
        console.log(error);
      });
  }

  reduceArray(array: Array<number>): number {
    // TODO: Create service to store app-wide helper functions
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return array.reduce(reducer);
  }
}
