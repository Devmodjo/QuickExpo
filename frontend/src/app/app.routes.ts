import { Routes } from '@angular/router';
import { VitrineComponent } from './components/vitrine/vitrine.component';

export const routes: Routes = [
  {
    path: '',
    component: VitrineComponent,
    title: 'QuickExpo - Assistant IA Méthodologique & Rédaction',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
