import { Routes } from '@angular/router';
import { VitrineComponent } from './components/vitrine/vitrine.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudioComponent } from './components/dashboard/studio/studio.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: VitrineComponent,
    title: 'QuickExpo - Assistant IA Méthodologique & Rédaction',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'QuickExpo - Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'studio/:projectId',
    component: StudioComponent,
    title: 'QuickExpo - Studio de Rédaction & Plan',
    canActivate: [authGuard]
  },
  {
    path: 'studio/:projectId/:tab',
    component: StudioComponent,
    title: 'QuickExpo - Studio de Rédaction & Plan',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

