import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminComponent } from './admin/admin.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
} from '@nebular/auth';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from './services/role-guard.service';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'logout', component: NbLogoutComponent },
      { path: 'register', component: NbRegisterComponent },
    ],
  },
  {
    path: 'personal',
    component: PersonalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: '*',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
