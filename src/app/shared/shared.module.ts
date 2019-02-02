import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {HeaderComponent} from './components/app-header/header/header.component';
import {RouterModule} from '@angular/router';
import {AppButtonDirective} from './directives/app-button.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    AppButtonDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    AppButtonDirective,
  ]
})
export class SharedModule {
}
