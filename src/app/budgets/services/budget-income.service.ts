import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {IncomeStream} from '../models/income-stream.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetIncomeService {

  private budgetIncomeTotalSrc = new BehaviorSubject<number>(undefined);
  budgetIncomeTotal = this.budgetIncomeTotalSrc.asObservable();

  private incomeCollection: AngularFirestoreCollection<IncomeStream>;
  incomeStreamList: Observable<DocumentChangeAction<IncomeStream>[]>;

  constructor(private data: AngularFirestore) {
    this.incomeCollection = data.collection<IncomeStream>('incomeStream');
  }

  getAllIncomeStreamsByBudget(budgetId: string): Observable<DocumentChangeAction<IncomeStream>[]> {
    return this.incomeStreamList = this.data.collection<IncomeStream>(
      'incomeStream',
      ref => ref.where('budgetId', '==', budgetId
      )
    ).snapshotChanges().pipe(
      tap(incomeStreams => {
        const incomeStreamAmounts = incomeStreams.map(stream => stream.payload.doc.data().amount);
        const incomeStreamTotal = this.reduceArray(incomeStreamAmounts);
        this.budgetIncomeTotalSrc.next(incomeStreamTotal);
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  addIncomeStream(incomeStream: IncomeStream): Promise<void | DocumentReference> {
    return this.incomeCollection.add(incomeStream)
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
