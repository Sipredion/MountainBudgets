import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserProfile} from '../../../users/models/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: UserProfile;
  @Output() close = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  closeProfile() {
    this.close.emit();
  }

}
