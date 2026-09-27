import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="py-24 sm:py-32 bg-background border-t border-border/50 relative overflow-hidden">
      <!-- Grid & Radial Glow -->
      <div class="absolute inset-0 supabase-grid opacity-50 pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[350px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-[#3ecf8e] border border-emerald-500/20 font-mono text-xs uppercase tracking-wider mb-6">
          <app-icon name="sparkles" [size]="14"></app-icon>
          <span>Méthodologie & Rigueur Académique</span>
        </div>

        <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 sm:mb-8 tracking-tight max-w-4xl mx-auto leading-[1.08]">
          Prêt à transformer vos travaux académiques ?
        </h2>

        <p class="text-foreground/75 text-base sm:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
          Rejoignez plus de 15 000 étudiants et chercheurs qui créent des présentations rigoureuses et des mémoires sans stress.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            (click)="openAuth.emit()"
            class="w-full sm:w-auto btn-emerald text-white px-9 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02]"
          >
            <span>Démarrer gratuitement</span>
            <app-icon name="arrow-right" [size]="18"></app-icon>
          </button>

          <a href="#features" class="w-full sm:w-auto">
            <button
              class="w-full sm:w-auto bg-card hover:bg-muted text-foreground border border-border px-8 py-4 rounded-xl font-semibold text-base transition-all hover:border-emerald-500/40"
            >
              Explorer les modules
            </button>
          </a>
        </div>
      </div>
    </section>
  `
})
export class CtaComponent {
  @Output() openAuth = new EventEmitter<void>();
}


