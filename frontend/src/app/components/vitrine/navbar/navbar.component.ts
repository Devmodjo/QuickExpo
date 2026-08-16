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
        <div class="glass-card rounded-full px-6 py-3 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-sm">
          <div class="flex items-center justify-between">
            
            <!-- Logo & Brand -->
            <a routerLink="/" class="flex items-center gap-2.5 group">
              <div class="w-9 h-9 rounded-full bg-[#00D084] flex items-center justify-center shadow-md shadow-[#00D084]/25 group-hover:scale-105 transition-transform duration-300">
                <app-icon name="sparkles" [size]="18" className="text-white"></app-icon>
              </div>
              <span class="text-xl font-black font-display tracking-tight text-foreground">
                Quick<span class="text-[#00D084]">Expo</span>
              </span>
            </a>

            <!-- Navigation Links (Desktop) -->
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
              <a href="#features" class="hover:text-[#00D084] transition-colors">
                Fonctionnalités
              </a>
              <a href="#pricing" class="hover:text-[#00D084] transition-colors">
                Tarifs
              </a>
              <a href="#about" class="hover:text-[#00D084] transition-colors">
                À propos
              </a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <!-- Theme Toggle Button -->
              <button
                (click)="themeService.toggleTheme()"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-muted/70 hover:bg-muted text-foreground transition-all duration-200 focus:outline-none"
                [attr.aria-label]="themeService.theme() === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'"
                title="Changer le thème"
              >
                <app-icon
                  [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'"
                  [size]="18"
                ></app-icon>
              </button>

              <!-- Log In Button -->
              <button
                (click)="openAuth.emit()"
                class="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-1.5 transition-colors hidden sm:block"
              >
                Se connecter
              </button>

              <!-- Sign Up Primary Emerald Pill Button -->
              <button
                (click)="openAuth.emit()"
                class="btn-emerald text-xs sm:text-sm font-semibold px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all duration-300"
              >
                S'inscrire
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


