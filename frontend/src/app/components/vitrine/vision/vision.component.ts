import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { GlassCardComponent } from '../ui/glass-card.component';

interface Testimonial {
  name: string;
  role: string;
  university: string;
  quote: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, IconComponent, GlassCardComponent],
  template: `
    <section id="vision" class="py-20 lg:py-28 relative overflow-hidden bg-muted/20">
      <!-- Ambient Lights -->
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-secondary/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Mission Header & Quote Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <!-- Left Text Column -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
              <app-icon name="brain" [size]="14"></app-icon>
              <span>Notre Engagement Pédagogique</span>
            </div>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-foreground tracking-tight leading-tight">
              L'IA au service de l'apprentissage, <br />
              <span class="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                jamais pour tricher.
              </span>
            </h2>

            <div class="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Nous croyons fermement que l'intelligence artificielle doit être un levier pour débloquer le potentiel intellectuel des étudiants, et non un substitut à la pensée critique.
              </p>
              <p>
                QuickExpo élimine l'angoisse de la page blanche en vous proposant une méthode claire : comprendre le sujet, structurer la réflexion et rédiger un travail de haute tenue académique dont vous êtes fiers.
              </p>
            </div>

            <!-- Core Values Pills -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div class="bg-card p-4 rounded-xl border border-border/60 shadow-xs flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold flex-shrink-0">
                  <app-icon name="shield-check" [size]="18"></app-icon>
                </div>
                <div>
                  <div class="text-xs font-bold text-foreground">Éthique</div>
                  <div class="text-[11px] text-muted-foreground">Anti-plagiat strict</div>
                </div>
              </div>

              <div class="bg-card p-4 rounded-xl border border-border/60 shadow-xs flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-bold flex-shrink-0">
                  <app-icon name="layers" [size]="18"></app-icon>
                </div>
                <div>
                  <div class="text-xs font-bold text-foreground">Méthodologie</div>
                  <div class="text-[11px] text-muted-foreground">Plans LMD certifiés</div>
                </div>
              </div>

              <div class="bg-card p-4 rounded-xl border border-border/60 shadow-xs flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">
                  <app-icon name="sparkles" [size]="18"></app-icon>
                </div>
                <div>
                  <div class="text-xs font-bold text-foreground">Autonomie</div>
                  <div class="text-[11px] text-muted-foreground">Gain de temps x5</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Feature Quote Box -->
          <div class="lg:col-span-5 relative">
            <app-glass-card extraClass="relative p-8 sm:p-10 rounded-3xl border-secondary/20 shadow-2xl">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center mb-6 shadow-md">
                <app-icon name="sparkles" [size]="24"></app-icon>
              </div>
              <blockquote class="text-lg sm:text-xl font-medium leading-relaxed text-foreground italic mb-6">
                "Notre mission est d'offrir à chaque étudiant, quel que soit son parcours, la rigueur méthodologique des meilleures universités mondiales."
              </blockquote>
              <div class="flex items-center gap-4 pt-4 border-t border-border/50">
                <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                  QE
                </div>
                <div>
                  <div class="font-bold text-foreground text-sm">L'équipe QuickExpo</div>
                  <div class="text-xs text-muted-foreground">Yaoundé, Cameroun & International</div>
                </div>
              </div>
            </app-glass-card>
          </div>

        </div>

        <!-- Real Student Testimonials Section -->
        <div class="mt-16">
          <div class="text-center mb-12">
            <h3 class="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Approuvé par des étudiants passionnés
            </h3>
            <p class="text-sm sm:text-base text-muted-foreground mt-2">
              Découvrez les retours de notre communauté universitaire
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              *ngFor="let t of testimonials"
              class="bg-card rounded-2xl p-8 border border-border/70 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div class="space-y-4">
                <!-- Stars -->
                <div class="flex items-center gap-1 text-amber-400">
                  <app-icon *ngFor="let s of [1,2,3,4,5]" name="sparkles" [size]="16"></app-icon>
                </div>
                <!-- Quote text -->
                <p class="text-foreground/90 text-sm sm:text-base leading-relaxed italic">
                  "{{ t.quote }}"
                </p>
              </div>

              <!-- Student Profile Row -->
              <div class="flex items-center gap-4 mt-6 pt-6 border-t border-border/50">
                <img
                  [src]="t.image"
                  [alt]="t.name"
                  class="w-12 h-12 rounded-full object-cover border-2 border-secondary/30 shadow-sm"
                />
                <div>
                  <div class="font-bold text-foreground text-sm">{{ t.name }}</div>
                  <div class="text-xs text-secondary font-medium">{{ t.role }}</div>
                  <div class="text-[11px] text-muted-foreground">{{ t.university }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class VisionComponent {
  public testimonials: Testimonial[] = [
    {
      name: 'Kadiatou Diallo',
      role: 'Étudiante en Master 2 Droit International',
      university: 'Université de Yaoundé II',
      quote: 'QuickExpo a complètement changé ma façon de préparer mes exposés. La structuration des parties et la pertinence de l\'introduction m\'ont fait gagner un temps précieux.',
      image: '/images/student-female.jpg',
      rating: 5
    },
    {
      name: 'Marc-Aurèle Kouassi',
      role: 'Élève Ingénieur en Informatique',
      university: 'École Polytechnique',
      quote: 'Ce que j\'apprécie le plus, c\'est la clarté du plan et la qualité de la mise en forme. On obtient un document professionnel direct sans stress.',
      image: '/images/student-male.jpg',
      rating: 5
    }
  ];
}
