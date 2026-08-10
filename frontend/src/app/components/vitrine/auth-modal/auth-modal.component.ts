import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      (click)="close()"
    >
      <div
        class="sm:max-w-[440px] w-full bg-card border border-border/80 text-foreground p-6 sm:p-8 rounded-3xl relative shadow-2xl animate-scaleUp"
        (click)="$event.stopPropagation()"
      >
        <!-- Close button -->
        <button
          (click)="close()"
          class="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Fermer la fenêtre"
        >
          <app-icon name="x" [size]="20"></app-icon>
        </button>

        <!-- Header Logo & Title -->
        <div class="text-center space-y-2 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center mx-auto text-white shadow-md">
            <app-icon name="zap" [size]="24"></app-icon>
          </div>
          <h3 class="text-2xl font-extrabold font-display text-foreground tracking-tight">
            {{ activeTab === 'login' ? 'Bienvenue sur QuickExpo' : 'Créez votre compte' }}
          </h3>
          <p class="text-xs sm:text-sm text-muted-foreground">
            {{ activeTab === 'login' ? 'Connectez-vous pour générer vos exposés IA' : 'Accès gratuit instantané à l\'assistant' }}
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="flex p-1 bg-muted rounded-xl mb-6 text-xs font-bold">
          <button
            (click)="activeTab = 'login'"
            class="flex-1 py-2.5 rounded-lg transition-all duration-200"
            [ngClass]="activeTab === 'login' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
          >
            Se connecter
          </button>
          <button
            (click)="activeTab = 'register'"
            class="flex-1 py-2.5 rounded-lg transition-all duration-200"
            [ngClass]="activeTab === 'register' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'"
          >
            S'inscrire
          </button>
        </div>

        <!-- Main Auth Providers -->
        <div class="space-y-3">
          <button
            (click)="handleSocialLogin('google')"
            class="w-full h-12 text-sm font-semibold border border-border/80 bg-background hover:bg-muted/60 rounded-xl flex items-center justify-center transition-all text-foreground shadow-xs hover:border-secondary/40 gap-3"
          >
            <app-icon name="chrome" [size]="20" className="text-secondary"></app-icon>
            <span>Continuer avec Google</span>
          </button>

          <button
            (click)="handleSocialLogin('github')"
            class="w-full h-12 text-sm font-semibold border border-border/80 bg-background hover:bg-muted/60 rounded-xl flex items-center justify-center transition-all text-foreground shadow-xs hover:border-secondary/40 gap-3"
          >
            <app-icon name="github" [size]="20"></app-icon>
            <span>Continuer avec GitHub</span>
          </button>

          <div class="relative flex items-center justify-center my-4">
            <div class="border-t border-border/60 w-full"></div>
            <span class="bg-card px-3 text-[11px] uppercase tracking-wider font-bold text-muted-foreground absolute">Ou par email</span>
          </div>

          <div class="space-y-3">
            <input
              type="email"
              placeholder="votre.email@universite.edu"
              class="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
            />
            <button
              (click)="handleSocialLogin('email')"
              class="w-full h-12 bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Accéder à mon espace</span>
              <app-icon name="arrow-right" [size]="16"></app-icon>
            </button>
          </div>
        </div>

        <div class="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
          En continuant, vous acceptez nos
          <a href="#" class="underline font-medium hover:text-secondary">Conditions d'utilisation</a>
          et notre
          <a href="#" class="underline font-medium hover:text-secondary">Politique de confidentialité</a>.
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
    .animate-scaleUp { animation: scaleUp 0.25s ease-out forwards; }
  `]
})
export class AuthModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  private router = inject(Router);
  public activeTab: 'login' | 'register' = 'login';

  public close(): void {
    this.closeModal.emit();
  }

  public handleSocialLogin(provider: string): void {
    console.log(`Login with ${provider}`);
    this.close();
    this.router.navigate(['/members']);
  }
}

