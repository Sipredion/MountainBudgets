import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {UserProfile} from '../models/user-profile.model';
import ActionCodeSettings = firebase.auth.ActionCodeSettings;

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userProfileSource = new BehaviorSubject<UserProfile>(null);
  public userProfile = this.userProfileSource.asObservable();

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  _isAuthenticated: boolean;

  constructor(private authState: AngularFireAuth) {
    authState.authState.subscribe(user => {
      if (!user) {
        // If the authState does not return a user object, nullify values and return.
        this.isAuthenticated = false;
        this.userProfileSource.next(null);
        return;
      }
      this.isAuthenticated = true;
      // TODO: fetch the user object and push it into the userProfile BehaviourSubject.
      // TODO: Store the user object in session storage for faster retrieval?
    });
  }

  // TODO: make sure the function returns a promise of type <UserProfile>.
  createNewAuthorisedUser(user: UserProfile, password: string) {
    const email = user.email;
    const actionCodeSettings: ActionCodeSettings = {
      url: 'http://localhost:4200',
      handleCodeInApp: true
    };
    // TODO: Send an email for user verification.
    this.authState.auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Send email verification. Not tested.
        authUser.user.sendEmailVerification(actionCodeSettings)
          .then(m => {
            console.log(m);
          })
          .catch(error => {
            console.log(error);
            // TODO: Create a logging system to catch and handle errors.
          });
        this.isAuthenticated = true;
        // TODO: create the UserProfile object using the values returned from the promise.
        // TODO: fetch the user object and push it into the userProfile BehaviourSubject.
      })
      .catch(error => {
        console.log(error);
        // TODO: Create a logging system to catch and handle errors.
      });
  }

  authoriseExistingUser(email: string, password: string) {
    this.authState.auth.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.isAuthenticated = true;
        // TODO: create the UserProfile object using the values returned from the promise.
        // TODO: fetch the user object and push it into the userProfile BehaviourSubject.
      })
      .catch(error => {
        console.log(error);
        // TODO: Create a logging system to catch and handle errors.
      });
  }

  signOutAuthorisedUser() {
    this.authState.auth.signOut();
  }
}
