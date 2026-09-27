import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class DashboardThemeService {
  private platformId = inject(PLATFORM_ID);
  public theme = signal<ThemeMode>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('quickexpo_dashboard_theme') as ThemeMode | null;
      if (saved) {
        this.setTheme(saved);
      } else {
        this.setTheme('light');
      }
    } else {
      this.setTheme('light');
    }
  }

  public toggleTheme(): void {
    const next: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  public setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('quickexpo_dashboard_theme', mode);
    }
  }
}
