import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/noAuth.guard';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard';
//import { PageNotFoundComponent } from './features/auth/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    canDeactivate: [UnsavedChangesGuard] // Prevent authenticated users from accessing login
  },
  {
    path: 'signup',
    loadChildren: () => import('./features/auth/components/signup/signup.module').then(m => m.SignupModule),
    canActivate: [NoAuthGuard],
    canDeactivate: [UnsavedChangesGuard] // Prevent authenticated users from accessing signup
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] // Require authentication for dashboard
  },
  { 
    path: 'forget-password', 
    loadChildren: () => import('./features/auth/components/forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
    canActivate: [NoAuthGuard] // Prevent authenticated users from accessing forgot password
  },
  {
    path: 'reset-password/:id/:accessToken',
    loadChildren : () => import('./features/auth/components/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [NoAuthGuard] // Prevent authenticated users from accessing reset password
  },
  {
    path: 'chat',
    loadChildren: () => import('./features/dashboard/components/chat/chat.module').then(m => m.ChatModule),
    canActivate : [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
