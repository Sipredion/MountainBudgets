import {Component, Input, OnInit} from '@angular/core';
import {fadeInOut} from '../../animations/fade-in-out.animation';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  animations: [fadeInOut]
})
export class SplashScreenComponent implements OnInit {

  @Input() isInitialising: string;

  constructor() {
  }

  ngOnInit() {
  }

}
