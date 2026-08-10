import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

interface FeatureItem {
  icon: IconName;
  title: string;
  badge: string;
  description: string;
  benefits: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="features" class="py-20 lg:py-28 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
            <app-icon name="sparkles" [size]="14"></app-icon>
            <span>L'Excellence Académique Par L'IA</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center justify-center items-center font-display text-foreground tracking-tight">
            Pourquoi choisir <span class="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">QuickExpo ?</span>
          </h2>
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Bien plus qu'un simple générateur de texte, QuickExpo est un véritable compagnon méthodologique conçu pour booster vos résultats scolaires et académiques.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            *ngFor="let feature of features"
            class="group bg-card rounded-2xl p-8 border border-border/70 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <!-- Top Row: Icon + Badge -->
              <div class="flex items-center justify-between mb-6">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                  <app-icon [name]="feature.icon" [size]="24"></app-icon>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                  {{ feature.badge }}
                </span>
              </div>

              <!-- Title & Desc -->
              <h3 class="text-xl font-bold font-display text-foreground mb-3 group-hover:text-secondary transition-colors">
                {{ feature.title }}
              </h3>
              <p class="text-muted-foreground text-sm leading-relaxed mb-6">
                {{ feature.description }}
              </p>
            </div>

            <!-- Bullet Points -->
            <ul class="space-y-2 pt-4 border-t border-border/40">
              <li *ngFor="let b of feature.benefits" class="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <app-icon name="check-circle" [size]="14" className="text-emerald-500 flex-shrink-0"></app-icon>
                <span>{{ b }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  `
})
export class FeaturesComponent {
  public features: FeatureItem[] = [
    {
      icon: 'brain',
      title: 'Assistant Méthodologique Sur-Mesure',
      badge: 'IA Pédagogique',
      description:
        'QuickExpo vous aide à clarifier vos idées, structurer des problématiques percutantes et construire un plan logique conforme au système LMD.',
      benefits: ['Problématiques percutantes', 'Plan en 2 ou 3 parties', 'Respect des normes universitaires']
    },
    {
      icon: 'eye',
      title: 'Prévisualisation & Édition Interactive',
      badge: 'Contrôle Total',
      description:
        'Visualisez la structure avant de valider. Modifiez le plan, réorganisez les titres et ajustez les points clés avant la génération finale.',
      benefits: ['Preview du plan', 'Re-ordonnancement simple', 'Personnalisation du ton']
    },
    {
      icon: 'layers',
      title: 'Structure Académique Rigooureuse',
      badge: 'Haute Qualité',
      description:
        'Introduction complète (amorce, définitions, problématique, annonce de plan), développement argumenté et conclusion synthétique avec ouverture.',
      benefits: ['Introduction guidée', 'Transition entre parties', 'Conclusion marquante']
    },
    {
      icon: 'shield-check',
      title: 'Garantie Anti-Plagiat & Citations',
      badge: '100% Original',
      description:
        'Conçu pour stimuler la réflexion et produire un contenu unique. Citations claires et structuration d\'idées sans plagiat direct.',
      benefits: ['Contenu original à 100%', 'Références et sources', 'Formulation académique']
    },
    {
      icon: 'sparkles',
      title: 'Mise en Page Automatique Style Gamma',
      badge: 'Prêt à Présenter',
      description:
        'Générez des diapositives élégantes et des fiches PDF magnifiquement mises en page, prêtes pour vos présentations devant professeurs et jury.',
      benefits: ['Export PDF & Word', 'Supports visuels élégants', 'Gain de temps massif']
    },
    {
      icon: 'graduation-cap',
      title: 'Multi-Disciplines & Tous Niveaux',
      badge: 'Polyvalent',
      description:
        'Adapté pour le secondaire (Lycée) jusqu\'au Master 2 et Doctorat. Droit, Économie, Médecine, Sciences, Gestion, Sociologie et plus.',
      benefits: ['Adaptation du vocabulaire', 'Niveau personnalisable', '+40 disciplines']
    },
  ];
}
