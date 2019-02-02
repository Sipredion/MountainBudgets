import {Component} from '@angular/core';
import {UserAuthService} from './users/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: UserAuthService) {
  }

}
