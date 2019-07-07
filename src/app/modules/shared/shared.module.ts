import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {AppButtonDirective} from './directives/app-button.directive';
import {RoundButtonDirective} from './directives/round-button.directive';
import {ProfileComponent} from './components/profile/profile.component';
import {UserSettingsComponent} from './components/profile/user-settings/user-settings.component';
import {AppSettingsComponent} from './components/profile/app-settings/app-settings.component';
import {SplashScreenComponent} from './components/splash-screen/splash-screen.component';
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    ProfileComponent,
    UserSettingsComponent,
    AppSettingsComponent,
    SplashScreenComponent,
    SpinnerComponent,

    // Directives
    AppButtonDirective,
    RoundButtonDirective,

  ],
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    // Components
    HeaderComponent,
    ProfileComponent,
    SplashScreenComponent,
    SpinnerComponent,

    // Directives
    AppButtonDirective,
    RoundButtonDirective,

    // Modules
    MaterialModule
  ]
})
export class SharedModule {
}
