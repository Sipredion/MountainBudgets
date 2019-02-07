import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {AppButtonDirective} from './directives/app-button.directive';
import {RoundButtonDirective} from './directives/round-button.directive';
import {ProfileComponent} from './components/profile/profile.component';
import { UserSettingsComponent } from './components/profile/user-settings/user-settings.component';
import { AppSettingsComponent } from './components/profile/app-settings/app-settings.component';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    ProfileComponent,

    // Directives
    AppButtonDirective,
    RoundButtonDirective,
    UserSettingsComponent,
    AppSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    // Components
    HeaderComponent,
    ProfileComponent,

    // Directives
    AppButtonDirective,
    RoundButtonDirective,
  ]
})
export class SharedModule {
}
