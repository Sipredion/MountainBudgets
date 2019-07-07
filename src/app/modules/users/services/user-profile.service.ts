import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';
import {UserProfile} from '../models/user-profile.model';
import {Observable, of} from 'rxjs';
import {catchError, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  usersCollection: AngularFirestoreCollection<UserProfile>;
  userProfile: Observable<any>;

  constructor(private fireDb: AngularFirestore) {
    this.usersCollection = fireDb.collection<UserProfile>('users');
  }

  // @ts-ignore
  // DocumentSnapshot requires at least one type argument. However, adding type arguments is incompatible with the return type.
  createNewUserProfile(user: UserProfile, uid: string): Promise<Observable<DocumentSnapshot>> {
    user.uid = uid;
    return this.usersCollection.doc<UserProfile>(uid).set(Object.assign({}, user))
      .then(() => {
        return this.userProfile = this.usersCollection.doc(uid).get().pipe(
          take(1),
          catchError(error => {
            console.log(error);
            return of(null);
          })
        );
      });
  }

  getCurrentUserProfile(id: string): Observable<DocumentSnapshot<UserProfile>> {
    return this.usersCollection.doc(id).get().pipe(
      take(1),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }
}
