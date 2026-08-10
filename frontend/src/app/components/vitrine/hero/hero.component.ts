import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

interface TargetItem {
  label: string;
  icon: IconName;
  count: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="relative min-h-[92vh] flex items-center overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
      <!-- Ambient Background Glows & Grid -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-secondary/20 via-primary/10 to-transparent blur-[120px] rounded-full"></div>
        <div class="absolute top-1/3 -right-20 w-96 h-96 bg-accent/15 blur-[100px] rounded-full"></div>
        <div class="absolute bottom-10 -left-20 w-96 h-96 bg-secondary/15 blur-[100px] rounded-full"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Copywriting & CTAs -->
          <div class="lg:col-span-6 text-left space-y-6">
            
            <!-- EdTech Badge -->
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full gradient-badge backdrop-blur-md shadow-sm">
              <span class="flex h-2.5 w-2.5 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <app-icon name="sparkles" [size]="15" className="text-secondary"></app-icon>
              <span class="text-xs font-bold tracking-wide justify-center items-center uppercase text-foreground/90">
                Générateur d'Exposés & Devoirs N°1 en Afrique
              </span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.15] text-foreground tracking-tight">
              Transformez vos idées 
              <!-- <span class="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                exposés impeccables
              </span> <br /> -->
              en quelques secondes.
            </h1>

            <!-- Subheading -->
            <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
              Ne perdez plus des heures sur la mise en forme. QuickExpo guide la réflexion, prépare la structure académique et vous fournit un document prêt à être présenté.
            </p>

            <!-- Primary CTAs -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                (click)="openAuth.emit()"
                class="bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-95 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
              >
                <app-icon name="zap" [size]="20" className="text-white"></app-icon>
                <span>Générer mon premier exposé</span>
                <app-icon name="arrow-right" [size]="18" className="text-white/80"></app-icon>
              </button>

              <a href="#how-it-works" class="flex">
                <button
                  class="w-full bg-card hover:bg-muted/60 text-foreground font-semibold text-base px-6 py-4 rounded-xl border border-border/80 shadow-sm hover:border-secondary/40 transition-all flex items-center justify-center gap-2"
                >
                  <app-icon name="book-open" [size]="18" className="text-secondary"></app-icon>
                  <span>Voir la démo</span>
                </button>
              </a>
            </div>

            <!-- Trust / Target Badges -->
            <div class="pt-6 border-t border-border/60">
              <p class="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Conçu pour réussir vos études & présentations :
              </p>
              <div class="flex flex-wrap gap-2.5">
                <div
                  *ngFor="let t of targets"
                  class="flex items-center gap-2 bg-card/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-border/60 text-xs font-semibold text-foreground shadow-xs hover:border-secondary/40 transition-colors"
                >
                  <app-icon [name]="t.icon" [size]="14" className="text-secondary"></app-icon>
                  <span>{{ t.label }}</span>
                  <span class="text-[10px] px-1.5 py-0.2 bg-muted text-muted-foreground rounded-md">{{ t.count }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Visual Mockup / Photo Showcase -->
          <div class="lg:col-span-6 relative">
            
            <!-- Main Hero Card Showcase -->
            <div class="relative mx-auto max-w-lg lg:max-w-none">
              
              <!-- Floating Backdrop Image Card -->
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 group">
                <img
                  src="/images/hero-student.jpg"
                  alt="Étudiante brillante utilisant QuickExpo AI pour préparer un exposé académique"
                  class="w-full h-[420px] sm:h-[480px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                
                <!-- Dark Gradient Overlay for text contrast -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <!-- Card Floating Content Overlay -->
                <div class="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-md shadow-md">
                    <app-icon name="check-circle" [size]="14"></app-icon>
                    <span>Exposé Réussi en 3 min</span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold font-display leading-snug">
                    "QuickExpo m'a permis de structurer mon mémoire et d'obtenir 18/20 en présentation !"
                  </h3>
                  <p class="text-xs text-white/80 font-medium">
                    Aïssatou B. — Étudiante en Master Management & IA
                  </p>
                </div>
              </div>

              <!-- Floating AI Feature Box (Gamma.app Style Interactive Preview) -->
              <div class="absolute -top-6 -left-6 sm:-left-8 max-w-[280px] glass-card p-4 rounded-2xl border border-white/30 dark:border-white/10 shadow-2xl animate-float-slow hidden sm:block">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold shadow-md">
                    <app-icon name="brain" [size]="20"></app-icon>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-foreground">Assistant IA Actif</div>
                    <div class="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Mise en page automatique
                    </div>
                  </div>
                </div>
                <div class="mt-3 text-xs bg-muted/60 p-2.5 rounded-xl font-mono text-muted-foreground">
                  Prompt: "L'impact de l'IA dans l'éducation en Afrique"
                </div>
              </div>

              <!-- Floating Stat Badge (Bottom Right) -->
              <div class="absolute -bottom-6 -right-4 sm:-right-6 glass-card p-4 rounded-2xl border border-white/30 dark:border-white/10 shadow-2xl hidden sm:block">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <app-icon name="shield-check" [size]="22"></app-icon>
                  </div>
                  <div>
                    <div class="text-lg font-extrabold text-foreground leading-none">100% Original</div>
                    <div class="text-[11px] text-muted-foreground font-medium mt-0.5">Anti-Plagiat & Normes Académiques</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  @Output() openAuth = new EventEmitter<void>();

  public targets: TargetItem[] = [
    { label: 'Universitaires', icon: 'graduation-cap', count: '+12k' },
    { label: 'Lycéens', icon: 'book-open', count: '+8k' },
    { label: 'Enseignants', icon: 'users', count: '+3k' },
    { label: 'Professionnels', icon: 'briefcase', count: '+5k' },
  ];
}

