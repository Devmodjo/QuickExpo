import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

interface StepItem {
  number: string;
  title: string;
  desc: string;
  icon: IconName;
  highlight: string;
  previewSnippet: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="how-it-works" class="py-20 lg:py-28 bg-muted/40 relative overflow-hidden">
      <!-- Background accent glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
            <app-icon name="zap" [size]="14"></app-icon>
            <span>Processus Révolutoinnaire</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-foreground tracking-tight">
            Comment ça <span class="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">marche ?</span>
          </h2>
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Un parcours simple et méthodique en 3 étapes guidées pour créer des exposés, mémoires et fiches de synthèse de niveau académique.
          </p>
        </div>

        <!-- 3-Step Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <div
            *ngFor="let step of steps; let i = index"
            class="group relative flex flex-col h-full bg-card rounded-2xl p-8 border border-border/70 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Step Number Badge -->
            <div class="flex items-center justify-between mb-6">
              <span class="text-4xl font-extrabold font-display text-secondary/30 group-hover:text-secondary transition-colors">
                {{ step.number }}
              </span>
              <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-sm">
                <app-icon [name]="step.icon" [size]="24"></app-icon>
              </div>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold font-display text-foreground mb-3 group-hover:text-secondary transition-colors">
              {{ step.title }}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
              {{ step.desc }}
            </p>

            <!-- Preview Snippet Box -->
            <div class="bg-muted/60 rounded-xl p-3.5 border border-border/50 text-xs font-mono text-muted-foreground flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <span class="truncate">{{ step.previewSnippet }}</span>
            </div>

            <!-- Bottom highlight pill -->
            <div class="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-secondary">
              <span>{{ step.highlight }}</span>
              <app-icon name="arrow-right" [size]="14" className="transform group-hover:translate-x-1 transition-transform"></app-icon>
            </div>
          </div>

        </div>

        <!-- Bottom Banner Callout -->
        <div class="mt-16 text-center">
          <div class="inline-flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-border/80 shadow-md text-sm font-semibold text-foreground">
            <app-icon name="check-circle" [size]="18" className="text-emerald-500"></app-icon>
            <span>Format conforme aux exigences des universités et grandes écoles (LMD & Supérieur)</span>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HowItWorksComponent {
  public steps: StepItem[] = [
    {
      number: '01',
      title: 'Décrivez votre sujet',
      desc: 'Indiquez le titre de votre exposé, le domaine (Droit, Économie, Santé, IA, Lettres...) et votre niveau d\'études.',
      icon: 'file-text',
      highlight: 'Saisie ultra-rapide',
      previewSnippet: 'Exemple : "Enjeux de la cyber-sécurité"'
    },
    {
      number: '02',
      title: 'Validez la preview & le plan',
      desc: 'L\'IA génère un plan détaillé (Introduction, Parties I & II, Conclusion). Vous validez ou ajustez chaque partie selon vos envies.',
      icon: 'eye',
      highlight: 'Contrôle méthodologique 100%',
      previewSnippet: 'Plan validé avec 4 axes de recherche'
    },
    {
      number: '03',
      title: 'Obtenez votre document pro',
      desc: 'Téléchargez immédiatement un document impeccablement rédigé, référencé et prêt pour vos soutenances ou remises.',
      icon: 'check-circle',
      highlight: 'Export PDF & Word instantané',
      previewSnippet: 'Document prêt en 3 minutes chronos'
    },
  ];
}

