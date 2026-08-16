import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="py-12 sm:py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Dark Card Container from Mockup (Deploying with reveal-scale) -->
        <div class="reveal-scale max-w-5xl mx-auto bg-[#181A1B] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 hover-lift">
          
          <!-- Background Subtle Glow -->
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00D084]/15 blur-[100px] rounded-full pointer-events-none"></div>

          <!-- Text Column from Mockup (Flying in from Left) -->
          <div class="reveal-left delay-100 space-y-4 text-center md:text-left max-w-2xl">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
              Prêt à transformer vos idées <br />
              <span class="text-[#00D084]">en exposés ?</span>
            </h2>
            <p class="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
              Rejoignez des milliers d'étudiants qui excellent dans leurs présentations.
            </p>
          </div>

          <!-- Button from Mockup (Flying in from Right) -->
          <div class="reveal-right delay-200 flex-shrink-0">
            <button
              (click)="openAuth.emit()"
              class="btn-emerald font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap"
            >
              <span>Commencer gratuitement</span>
              <app-icon name="arrow-right" [size]="18"></app-icon>
            </button>
          </div>

        </div>

      </div>
    </section>
  `

})
export class CtaComponent {
  @Output() openAuth = new EventEmitter<void>();
}


