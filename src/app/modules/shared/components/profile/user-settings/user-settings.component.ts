import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../../../users/services/user-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(public authService: UserAuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOutAuthorisedUser()
      .then(() => {
        this.router.navigateByUrl('/user/login');
      });
  }

}
