import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../../services/theme.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-3">
        <div class="glass-card rounded-2xl px-5 py-3.5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5">
          <div class="flex items-center justify-between">
            <!-- Logo & Brand -->
            <a routerLink="/" class="flex items-center gap-3 group">
              <div class="relative">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 group-hover:shadow-primary/40 transition-all duration-300">
                  <app-icon name="zap" [size]="20" className="text-white"></app-icon>
                </div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div class="flex flex-col">
                <span class="text-xl font-extrabold font-display tracking-tight text-foreground flex items-center gap-1.5">
                  Quick<span class="text-secondary font-black">Expo</span>
                  <span class="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">AI 2.0</span>
                </span>
                <span class="text-[11px] text-muted-foreground -mt-1 hidden sm:block font-medium">Assistant Méthodologique EdTech</span>
              </div>
            </a>

            <!-- Navigation Anchors (Desktop) -->
            <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
              <a href="#how-it-works" class="hover:text-primary transition-colors flex items-center gap-1.5">
                <span>Comment ça marche</span>
              </a>
              <a href="#features" class="hover:text-primary transition-colors flex items-center gap-1.5">
                <span>Fonctionnalités</span>
              </a>
              <a href="#demo" class="hover:text-primary transition-colors flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Aperçu IA</span>
              </a>
              <a href="#vision" class="hover:text-primary transition-colors flex items-center gap-1.5">
                <span>Notre Vision</span>
              </a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <!-- Theme Toggle -->
              <button
                (click)="themeService.toggleTheme()"
                class="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/60 hover:bg-muted text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                [attr.aria-label]="themeService.theme() === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'"
                title="Changer le thème"
              >
                <div
                  class="transition-transform duration-500"
                  [style.transform]="themeService.theme() === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)'"
                >
                  <app-icon
                    [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'"
                    [size]="18"
                  ></app-icon>
                </div>
              </button>

              <!-- Primary Auth CTA -->
              <button
                (click)="openAuth.emit()"
                class="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary via-secondary to-accent p-0.5 font-semibold text-white shadow-md hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span class="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-[10px] bg-primary text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-opacity-90 gap-2">
                  <app-icon name="sparkles" [size]="16" className="text-secondary"></app-icon>
                  <span>Créer mon exposé</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  @Output() openAuth = new EventEmitter<void>();
}

