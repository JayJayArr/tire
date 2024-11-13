import { Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  { path: 'personal', component: PersonalComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
];
