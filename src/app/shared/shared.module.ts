import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeaderComponent} from './components/app-header/header/header.component';
import {RouterModule} from '@angular/router';
import {AppButtonDirective} from './directives/app-button.directive';
import {ProfileButtonComponent} from './components/app-header/profile-button/profile-button.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppButtonDirective,
    ProfileButtonComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    AppButtonDirective,
    ProfileButtonComponent
  ]
})
export class SharedModule {
}
