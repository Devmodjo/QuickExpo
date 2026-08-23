import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="vision" class="py-12 sm:py-16 bg-muted/20 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Main Featured Testimonial Card (Deploying with reveal-scale animation) -->
        <div class="reveal-scale max-w-4xl mx-auto bg-card rounded-3xl p-8 sm:p-14 border border-border/80 shadow-xl relative text-center hover-lift">

          
          <!-- Large Emerald Quote Icon (from Mockup) -->
          <div class="text-[#00D084] text-5xl sm:text-6xl font-serif font-black mb-6 select-none opacity-80">
            ”
          </div>

          <!-- Quote Text (Exact text from Mockup) -->
          <blockquote class="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display leading-relaxed text-foreground max-w-3xl mx-auto tracking-tight">
            "{{ testimonials[activeIdx].quote }}"
          </blockquote>

          <!-- Author Info (Exact text & avatar from Mockup) -->
          <div class="mt-8 flex flex-col items-center justify-center space-y-2">
            <div class="relative">
              <img
                [src]="testimonials[activeIdx].avatar"
                [alt]="testimonials[activeIdx].name"
                class="w-16 h-16 rounded-full object-cover border-2 border-[#00D084] shadow-md"
              />
              <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00D084] text-white flex items-center justify-center text-[10px]">
                ✓
              </div>
            </div>

            <div class="pt-2">
              <div class="font-bold text-foreground text-base sm:text-lg">
                {{ testimonials[activeIdx].name }}
              </div>
              <div class="text-xs sm:text-sm text-muted-foreground font-medium">
                {{ testimonials[activeIdx].role }}
              </div>
            </div>
          </div>

          <!-- Interactive Testimonial Switcher Dots -->
          <div class="mt-8 flex items-center justify-center gap-2">
            <button
              *ngFor="let item of testimonials; let i = index"
              (click)="activeIdx = i"
              class="h-2.5 rounded-full transition-all duration-300"
              [ngClass]="activeIdx === i ? 'w-8 bg-[#00D084]' : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'"
              [attr.aria-label]="'Témoignage ' + (i + 1)"
            ></button>
          </div>

        </div>

      </div>
    </section>
  `
})
export class VisionComponent {
  public activeIdx: number = 0;

  public testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Clara B.',
      role: 'Étudiante en Master',
      quote: 'QuickExpo a divisé par 4 mon temps de préparation d\'exposés. Le résultat est bluffant de professionnalisme. Je peux me concentrer sur l\'oral plutôt que sur les slides.',
      avatar: '/groupe etudiant banner.jpg'
    },
    {
      id: 2,
      name: 'Marc-Aurèle K.',
      role: 'Élève Ingénieur Polytech',
      quote: 'Une structure académique irréprochable et un gain de temps massif. L\'exportation PPTX et PDF directement modifiable est tout simplement parfaite.',
      avatar: '/groupe etudiant banner.jpg'
    },
    {
      id: 3,
      name: 'Kadiatou D.',
      role: 'Master 2 Droit International',
      quote: 'L\'assistant IA m\'aide à cadrer mes problématiques juridiques avec une pertinence incroyable. Je recommande QuickExpo à tous mes camarades !',
      avatar: '/groupe etudiant banner.jpg'
    }
  ];
}

