import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../../../users/services/user-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: UserAuthService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOutAuthorisedUser()
      .then(() => {
        this.router.navigateByUrl('/user/login');
      });
  }

}
