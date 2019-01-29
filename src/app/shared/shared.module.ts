import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './components/app-header/navigation/navigation.component';
import {MaterialModule} from '../material/material.module';
import {HeaderComponent} from './components/app-header/header/header.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent
  ]
})
export class SharedModule {
}
