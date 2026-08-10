import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-secondary text-white">
      <!-- Background Ambient Orbs & Pattern -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,107,242,0.25),transparent_50%)] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <app-icon name="sparkles" [size]="14" className="text-secondary"></app-icon>
            <span>Prêt à passer au niveau supérieur ?</span>
          </div>

          <!-- Main Call to Action Title -->
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight">
            Réussissez vos travaux académiques <br />
            <span class="bg-gradient-to-r from-secondary via-emerald-400 to-accent bg-clip-text text-transparent">
              dès aujourd'hui.
            </span>
          </h2>

          <p class="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Rejoignez des milliers d'étudiants, enseignants et professionnels qui économisent un temps précieux et obtiennent des résultats exceptionnels avec QuickExpo AI.
          </p>

          <!-- Feature Bullets -->
          <div class="flex flex-wrap justify-center items-center gap-6 text-sm text-white/90 font-medium py-2">
            <div class="flex items-center gap-2">
              <app-icon name="check-circle" [size]="18" className="text-emerald-400"></app-icon>
              <span>Essai 100% gratuit</span>
            </div>
            <div class="flex items-center gap-2">
              <app-icon name="check-circle" [size]="18" className="text-emerald-400"></app-icon>
              <span>Sans carte bancaire</span>
            </div>
            <div class="flex items-center gap-2">
              <app-icon name="check-circle" [size]="18" className="text-emerald-400"></app-icon>
              <span>Export PDF & Word instantané</span>
            </div>
          </div>

          <!-- Primary CTA Button -->
          <div class="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              (click)="openAuth.emit()"
              class="w-full sm:w-auto bg-gradient-to-r from-secondary to-accent hover:opacity-95 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-secondary/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Créer mon premier document</span>
              <app-icon name="arrow-right" [size]="22"></app-icon>
            </button>
          </div>

          <!-- Microcopy guarantee -->
          <p class="text-xs text-white/60 font-medium">
            Prêt en moins de 3 minutes • Déjà +15,000 documents générés
          </p>

        </div>
      </div>
    </section>
  `
})
export class CtaComponent {
  @Output() openAuth = new EventEmitter<void>();
}

