import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { OverviewComponent } from './overview/overview.component';
import { AdminComponent } from './admin/admin.component';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
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
    canActivate: [AuthGuard],
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
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
