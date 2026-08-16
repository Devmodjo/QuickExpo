import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="relative pt-24 pb-10 lg:pt-32 lg:pb-14 overflow-hidden">
      <!-- Ambient background glows -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D084]/15 blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Large Hero Card Banner (Deploys dynamically with reveal-hero animation) -->
        <div class="reveal-hero relative rounded-[2.5rem] overflow-hidden border border-border/80 shadow-2xl bg-card transition-colors duration-300">
          
          <!-- Background Image with Theme-Adapted Green Overlay -->
          <div class="absolute inset-0 z-0">
            <img
              src="/groupe etudiant banner.jpg"
              alt="Bannière étudiants QuickExpo AI"
              class="w-full h-full object-cover object-right sm:object-center opacity-40 dark:opacity-30"
            />
            <!-- Soft Green Gradient Tint Overlay adapting to theme -->
            <div class="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent dark:from-card dark:via-card/85 dark:to-card/40"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
          </div>

          <!-- Hero Content Overlay Inside Banner Card -->
          <div class="relative z-10 p-8 sm:p-14 lg:p-20 max-w-3xl space-y-6">
            
            <!-- Top Pill Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-emerald text-xs font-semibold backdrop-blur-md animate-pulse-subtle">
              <app-icon name="sparkles" [size]="14" className="text-[#00D084]"></app-icon>
              <span>IA Méthodologique & Rédaction Académique</span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.12] text-foreground tracking-tight">
              Structurez et générez vos exposés, mémoires & rapports <span class="text-[#00D084]">avec l'IA.</span>
            </h1>

            <!-- Subheadline -->
            <p class="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-2xl">
              De la recherche d'idées à la mise en page finale, QuickExpo vous accompagne dans la préparation et la rédaction de vos présentations académiques.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                (click)="openAuth.emit()"
                class="btn-emerald font-bold text-base px-8 py-4 rounded-full shadow-lg flex items-center justify-center gap-2.5"
              >
                <span>Commencer gratuitement</span>
                <app-icon name="arrow-right" [size]="18"></app-icon>
              </button>

              <a href="#how-it-works" class="flex">
                <button
                  class="w-full sm:w-auto bg-card/80 backdrop-blur-md hover:bg-muted text-foreground font-semibold text-base px-7 py-4 rounded-full border border-border/80 shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Voir la démo</span>
                  <span class="text-sm">🎬</span>
                </button>
              </a>
            </div>

          </div>
        </div>

        <!-- Key Metrics Bar with Side Reveal Animations -->
        <div class="mt-10 max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center border-t border-b border-border/60 py-6">
          <div class="reveal-left delay-100">
            <div class="text-3xl sm:text-4xl font-black font-display text-foreground tracking-tight">50k+</div>
            <div class="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Exposés créés</div>
          </div>
          <div class="reveal-up delay-200">
            <div class="text-3xl sm:text-4xl font-black font-display text-foreground tracking-tight">15k+</div>
            <div class="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Étudiants conquis</div>
          </div>
          <div class="reveal-right delay-300">
            <div class="text-3xl sm:text-4xl font-black font-display text-foreground tracking-tight">4.9/5</div>
            <div class="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Note moyenne</div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  @Output() openAuth = new EventEmitter<void>();
}





