import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public authService: UserAuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(form) {
    const {email, password} = form.value;
    this.authService.authoriseExistingUser(email, password)
      .then(() => {
        this.router.navigateByUrl('/budget/list');
      });
  }

}
