import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { ForgetPasswordComponent } from './forget-password.component';

const routes: Routes = [
  { path: '', component: ForgetPasswordComponent }
];

@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgToastModule,
    RouterModule.forChild(routes),
  ]
})
export class ForgetPasswordModule { } 