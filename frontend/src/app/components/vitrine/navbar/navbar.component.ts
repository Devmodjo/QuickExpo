import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../../services/theme.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 sm:py-4">
      <div class="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        <!-- Brand / Logo -->
        <a routerLink="/" class="flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-95">
          <div class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#091f1b] to-[#164e43] p-0.5 shadow-md flex items-center justify-center text-white">
            <div class="w-full h-full bg-[#0c1f1d] rounded-[10px] flex items-center justify-center">
              <app-icon name="sparkles" [size]="20" className="text-emerald-400"></app-icon>
            </div>
          </div>
          <div class="flex flex-col -space-y-0.5">
            <span class="text-xl sm:text-2xl font-black italic tracking-tighter leading-none text-foreground">
              Quick<span class="text-emerald-600 dark:text-emerald-400">Expo</span>
            </span>
            <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 leading-none">
              Document AI Hub
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-7 lg:gap-8">
          <a class="text-foreground/75 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm" href="#features">Fonctionnalités</a>
          <a class="text-foreground/75 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm" href="#how-it-works">Processus</a>
          <a class="text-foreground/75 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm" href="#pricing">Tarifs</a>
          <a class="text-foreground/75 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm" href="#about">À propos</a>
          <a class="text-foreground/75 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm" href="#faq">FAQ</a>
        </div>

        <!-- Desktop Action Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Theme Toggle -->
          <button
            (click)="themeService.toggleTheme()"
            class="p-2 rounded-full hover:bg-muted/70 text-foreground transition-colors"
            [attr.aria-label]="themeService.theme() === 'dark' ? 'Passer en clair' : 'Passer en sombre'"
          >
            <app-icon [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'" [size]="18"></app-icon>
          </button>

          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground border border-border/60">
            FR
          </span>

          <button
            (click)="openAuth.emit()"
            class="inline-flex items-center justify-center rounded-full transition-all active:scale-95 px-5 py-2.5 text-sm text-foreground hover:bg-muted font-medium"
          >
            Connexion
          </button>

          <button
            (click)="openAuth.emit()"
            class="btn-emerald text-sm font-bold rounded-full px-6 py-2.5 shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <span>S'inscrire</span>
            <app-icon name="arrow-right" [size]="14"></app-icon>
          </button>
        </div>

        <!-- Mobile Actions & Hamburger -->
        <div class="flex md:hidden items-center gap-2">
          <button
            (click)="themeService.toggleTheme()"
            class="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
          >
            <app-icon [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'" [size]="18"></app-icon>
          </button>

          <button
            (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
            class="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Menu de navigation"
          >
            <app-icon [name]="isMobileMenuOpen() ? 'x' : 'menu'" [size]="24"></app-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Drawer Dropdown -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-2xl px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <div class="flex flex-col space-y-3">
            <a (click)="closeMobileMenu()" href="#features" class="text-base font-semibold text-foreground/85 hover:text-[#00D084] py-1 transition-colors">Fonctionnalités</a>
            <a (click)="closeMobileMenu()" href="#how-it-works" class="text-base font-semibold text-foreground/85 hover:text-[#00D084] py-1 transition-colors">Processus</a>
            <a (click)="closeMobileMenu()" href="#pricing" class="text-base font-semibold text-foreground/85 hover:text-[#00D084] py-1 transition-colors">Tarifs</a>
            <a (click)="closeMobileMenu()" href="#about" class="text-base font-semibold text-foreground/85 hover:text-[#00D084] py-1 transition-colors">À propos</a>
            <a (click)="closeMobileMenu()" href="#faq" class="text-base font-semibold text-foreground/85 hover:text-[#00D084] py-1 transition-colors">FAQ</a>
          </div>

          <div class="pt-4 border-t border-border/60 flex flex-col gap-3">
            <button
              (click)="openAuth.emit(); closeMobileMenu()"
              class="w-full py-3 rounded-full border border-border/80 text-foreground font-semibold text-center hover:bg-muted transition-colors"
            >
              Connexion
            </button>
            <button
              (click)="openAuth.emit(); closeMobileMenu()"
              class="w-full btn-emerald py-3 rounded-full font-bold text-center shadow-lg"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  public isMobileMenuOpen = signal(false);
  @Output() openAuth = new EventEmitter<void>();

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}


