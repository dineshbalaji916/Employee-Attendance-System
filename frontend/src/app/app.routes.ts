import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'employee',
    loadChildren: () =>
      import('./pages/employee/employee.routes').then(m => m.routes)
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./pages/manager/manager.routes').then(m => m.routes)
  }
];
