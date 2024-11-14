import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './settings/settings.component';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
