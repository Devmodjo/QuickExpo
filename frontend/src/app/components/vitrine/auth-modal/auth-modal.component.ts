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
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      (click)="close()"
    >
      <!-- Explicit High-Contrast Dark Container for perfect legibility in light & dark themes -->
      <div
        class="sm:max-w-[420px] w-full bg-[#111A16] text-white border border-[#00D084]/30 p-6 sm:p-8 rounded-3xl relative shadow-2xl animate-scaleUp"
        (click)="$event.stopPropagation()"
      >
        <!-- Close button -->
        <button
          (click)="close()"
          class="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fermer la fenêtre"
        >
          <app-icon name="x" [size]="20"></app-icon>
        </button>

        <!-- Header Logo & Title -->
        <div class="text-center space-y-2 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-[#00D084] flex items-center justify-center mx-auto text-white shadow-lg shadow-[#00D084]/30">
            <app-icon name="zap" [size]="24"></app-icon>
          </div>
          <h3 class="text-2xl font-extrabold font-display tracking-tight text-white">
            {{ activeTab === 'login' ? 'Bienvenue sur QuickExpo' : 'Créez votre compte' }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-300 font-medium">
            {{ activeTab === 'login' ? 'Connectez-vous pour générer vos exposés IA' : 'Accès gratuit instantané à la plateforme' }}
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="flex p-1 bg-[#1A2722] rounded-xl mb-6 text-xs font-bold border border-white/10">
          <button
            (click)="activeTab = 'login'"
            class="flex-1 py-2.5 rounded-lg transition-all duration-200"
            [ngClass]="activeTab === 'login' ? 'bg-[#00D084] text-white shadow-md' : 'text-gray-400 hover:text-white'"
          >
            Se connecter
          </button>
          <button
            (click)="activeTab = 'register'"
            class="flex-1 py-2.5 rounded-lg transition-all duration-200"
            [ngClass]="activeTab === 'register' ? 'bg-[#00D084] text-white shadow-md' : 'text-gray-400 hover:text-white'"
          >
            S'inscrire
          </button>
        </div>

        <!-- Auth Providers -->
        <div class="space-y-3">
          <button
            (click)="handleSocialLogin('google')"
            class="w-full h-12 text-sm font-semibold border border-white/15 bg-[#18241F] hover:bg-[#203029] text-white rounded-xl flex items-center justify-center transition-all shadow-xs hover:border-[#00D084]/60 gap-3"
          >
            <app-icon name="chrome" [size]="20" className="text-[#00D084]"></app-icon>
            <span>Continuer avec Google</span>
          </button>

          <button
            (click)="handleSocialLogin('github')"
            class="w-full h-12 text-sm font-semibold border border-white/15 bg-[#18241F] hover:bg-[#203029] text-white rounded-xl flex items-center justify-center transition-all shadow-xs hover:border-[#00D084]/60 gap-3"
          >
            <app-icon name="github" [size]="20"></app-icon>
            <span>Continuer avec GitHub</span>
          </button>

          <div class="relative flex items-center justify-center my-4">
            <div class="border-t border-white/10 w-full"></div>
            <span class="bg-[#111A16] px-3 text-[11px] uppercase tracking-wider font-bold text-gray-400 absolute">Ou par email</span>
          </div>

          <div class="space-y-3">
            <input
              type="email"
              placeholder="votre.email@universite.edu"
              class="w-full h-12 px-4 rounded-xl border border-white/15 bg-[#18241F] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00D084] transition-all placeholder:text-gray-400"
            />
            <button
              (click)="handleSocialLogin('email')"
              class="w-full h-12 btn-emerald font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Accéder à mon espace</span>
              <app-icon name="arrow-right" [size]="16"></app-icon>
            </button>
          </div>
        </div>

        <div class="mt-6 text-center text-xs text-gray-400 leading-relaxed">
          En continuant, vous acceptez nos
          <a href="#" class="underline font-medium text-white hover:text-[#00D084]">Conditions d'utilisation</a>
          et notre
          <a href="#" class="underline font-medium text-white hover:text-[#00D084]">Politique de confidentialité</a>.
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




