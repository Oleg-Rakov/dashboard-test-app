import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    DashboardComponent,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
