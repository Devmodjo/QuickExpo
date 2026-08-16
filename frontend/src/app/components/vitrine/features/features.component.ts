import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
  revealClass: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="features" class="py-12 sm:py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header with Scroll Fade Up Animation -->
        <div class="reveal-up text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-foreground tracking-tight">
            La qualité, <span class="text-[#00D084]">sans l'effort.</span>
          </h2>
          <p class="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
            Structurez et générez vos exposés académiques, mémoires et rapports en toute simplicité.
          </p>
        </div>

        <!-- 6 Features Grid with Flying Entrance Animations from Left & Right -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            *ngFor="let feature of features; let i = index"
            class="group bg-card rounded-2xl p-7 border border-border/80 shadow-xs hover-lift transition-all duration-300 flex flex-col justify-between"
            [ngClass]="[feature.revealClass, 'delay-' + ((i % 3) + 1) + '00']"
          >
            <div>
              <!-- Icon in Green Soft Container -->
              <div class="w-12 h-12 rounded-xl bg-[#00D084]/15 text-[#00D084] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#00D084] group-hover:text-white transition-all duration-300">
                <app-icon [name]="feature.icon" [size]="22"></app-icon>
              </div>

              <!-- Title & Description -->
              <h3 class="text-lg sm:text-xl font-bold font-display text-foreground mb-2.5 group-hover:text-[#00D084] transition-colors">
                {{ feature.title }}
              </h3>
              <p class="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class FeaturesComponent {
  public features: FeatureItem[] = [
    {
      icon: 'sparkles',
      title: 'Génération Intelligente',
      description: 'Structuration et rédaction guidée pour vos exposés, mémoires et travaux de recherche.',
      revealClass: 'reveal-left'
    },
    {
      icon: 'layers',
      title: 'Mise en page Auto',
      description: 'Obtenez un rendu propre et équilibré, prêt à l\'impression ou à la présentation.',
      revealClass: 'reveal-up'
    },
    {
      icon: 'file-text',
      title: 'Multi-formats (PDF & PPTX)',
      description: 'Exportez facilement vos travaux sous format document ou diapositives.',
      revealClass: 'reveal-right'
    },
    {
      icon: 'brain',
      title: 'Analyse & Organisation',
      description: 'Synthétisez vos données et vos axes de recherche en chapitres clairs.',
      revealClass: 'reveal-left'
    },
    {
      icon: 'eye',
      title: 'Style Personnalisé',
      description: 'S\'adapte à votre charte académique et aux consignes de votre établissement.',
      revealClass: 'reveal-up'
    },
    {
      icon: 'users',
      title: 'Collaboration',
      description: 'Échangez avec vos camarades et partagez vos fiches de travail en toute sérénité.',
      revealClass: 'reveal-right'
    }
  ];
}



