import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, of, pipe} from 'rxjs';
import {UserProfile} from '../models/user-profile.model';
import ActionCodeSettings = firebase.auth.ActionCodeSettings;
import {UserProfileService} from './user-profile.service';
import {catchError, tap} from 'rxjs/operators';

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

  constructor(private authState: AngularFireAuth,
              private profileService: UserProfileService) {
    authState.authState.subscribe(user => {
      // TODO: Create a splash screen to display while the user is re-authenticated.
      if (!user) {
        // If the authState does not return a user object, nullify values and return.
        this.isAuthenticated = false;
        this.userProfileSource.next(null);
        return;
      }
      this.profileService.getCurrentUserProfile(user.uid).subscribe(authUser => {
        // TODO: Store the user object in session storage for faster retrieval?
        this.userProfileSource.next(authUser.data());
        this.isAuthenticated = true;
      });
    });
  }

  createNewAuthorisedUser(user: UserProfile, password: string): Promise<void> {
    // TODO: Send an email for user verification.
    return this.authState.auth.createUserWithEmailAndPassword(user.email, password)
      .then(authUser => {
        console.log(authUser);
        // Create the user profile and subscribe to the returned observable.
        this.profileService.createNewUserProfile(user, authUser.user.uid)
          .then(user$ => {
            user$.subscribe(profile => {
              this.userProfileSource.next(profile.data);
              this.isAuthenticated = true;
            });
          });
      })
      .catch(error => {
        console.log(error);
        // TODO: Create a logging system to catch and handle errors.
      });
  }

  authoriseExistingUser(email: string, password: string): Promise<void> {
    return this.authState.auth.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.profileService.getCurrentUserProfile(authUser.user.uid).subscribe(user => {
          this.userProfileSource.next(user.data());
          this.isAuthenticated = true;
        });
      })
      .catch(error => {
        console.log(error);
        // TODO: Create a logging system to catch and handle errors.
      });
  }

  signOutAuthorisedUser(): Promise<void> {
    return this.authState.auth.signOut();
  }
}
