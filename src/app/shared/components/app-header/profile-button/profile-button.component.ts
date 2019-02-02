import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  profilePagState = 'closed';
  showProfile = false;

  constructor() {
  }

  ngOnInit() {
  }

  openProfile() {
    this.showProfile ? this.showProfile = false : this.showProfile = true;
    // if (this.profilePagState === 'closed') {
    //   this.content.nativeElement.style.opacity = '1';
    //   this.content.nativeElement.style.height = '80%';
    //   this.content.nativeElement.style.width = '100vw';
    // } else {
    //   this.content.nativeElement.style.opacity = '0';
    //   this.content.nativeElement.style.height = '0';
    //   this.content.nativeElement.style.width = '0';
    // }
    // this.profilePagState === 'closed' ? this.profilePagState = 'open' : this.profilePagState = 'closed';
  }

}
