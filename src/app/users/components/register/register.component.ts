import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../services/user-auth.service';
import {UserProfile} from '../../models/user-profile.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: UserAuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: [''],
      photoUrl: [''],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  registerNewUser(form: FormGroup) {
    const {email, username, photoUrl, password, passwordConfirm} = form.value;
    if (password === passwordConfirm) {
      const profile = new UserProfile({
        email: email,
        photoUrl: photoUrl,
        username: username
      });
      this.authService.createNewAuthorisedUser(profile, password)
        .then(() => {
          this.router.navigateByUrl('/budget/list');
        });;
    } else {
      alert('Passwords Do Not Match!');
    }
  }

}
