import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UserAuthService} from '../../../users/services/user-auth.service';
import {Router} from '@angular/router';
import {UserProfile} from '../../../users/models/user-profile.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() user: UserProfile;

  @ViewChild('profileButton') profileButton: ElementRef;

  profileState = 'initial';

  env = environment;

  constructor(public authService: UserAuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  closeProfile() {
    this.profileState = 'closed';
  }

  logout() {
    this.authService.signOutAuthorisedUser()
      .then(() => {
        this.router.navigateByUrl('/user/login');
      });
  }

}
