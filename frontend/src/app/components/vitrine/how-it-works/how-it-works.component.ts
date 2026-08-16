import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  previewTitle: string;
  previewDesc: string;
  previewTag: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="how-it-works" class="py-12 sm:py-16 bg-muted/30 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header from Mockup -->
        <div class="reveal-up mb-10 text-left max-w-2xl">
          <h2 class="text-3xl sm:text-5xl font-extrabold font-display text-foreground tracking-tight">
            Un processus simple <br />
            <span class="text-muted-foreground font-normal">et efficace.</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column: 4 Interactive Steps Cards (Flying in from Left) -->
          <div class="reveal-left delay-100 lg:col-span-6 space-y-4">
            <div
              *ngFor="let step of steps"
              (click)="activeStep = step.id"
              class="cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-start gap-5 group hover-lift"
              [ngClass]="
                activeStep === step.id
                  ? 'bg-card border-[#00D084] shadow-md scale-[1.01]'
                  : 'bg-card/50 border-border/60 hover:bg-card hover:border-border'
              "
            >
              <!-- Step Number Badge -->
              <span
                class="text-2xl font-black font-display tracking-tight transition-colors"
                [ngClass]="activeStep === step.id ? 'text-[#00D084]' : 'text-muted-foreground/50'"
              >
                {{ step.number }}
              </span>

              <div class="space-y-1">
                <h3
                  class="text-lg font-bold font-display transition-colors"
                  [ngClass]="activeStep === step.id ? 'text-foreground' : 'text-foreground/70'"
                >
                  {{ step.title }}
                </h3>
                <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive UI Preview Box (Flying in from Right) -->
          <div class="reveal-right delay-200 lg:col-span-6">
            <div class="bg-card rounded-3xl p-6 sm:p-8 border border-border/80 shadow-2xl relative overflow-hidden hover-lift">

              
              <!-- Mock Header Bar -->
              <div class="flex items-center justify-between pb-6 border-b border-border/50 mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[#00D084]/20 text-[#00D084] flex items-center justify-center font-bold">
                    <app-icon name="sparkles" [size]="18"></app-icon>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-foreground">Aperçu QuickExpo Studio</div>
                    <div class="text-[11px] text-[#00D084] font-semibold">Étape {{ activeStep }} / 4</div>
                  </div>
                </div>

                <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-[#00D084]/15 text-[#00D084]">
                  {{ steps[activeStep - 1].previewTag }}
                </span>
              </div>

              <!-- Dynamic Card Mockup View based on activeStep -->
              <div class="bg-muted/50 rounded-2xl p-6 space-y-4 border border-border/40">
                <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span class="w-2 h-2 rounded-full bg-[#00D084]"></span>
                  <span>Modèle IA : GPT-4o EdTech Engine</span>
                </div>

                <h4 class="text-xl font-bold font-display text-foreground">
                  {{ steps[activeStep - 1].previewTitle }}
                </h4>

                <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {{ steps[activeStep - 1].previewDesc }}
                </p>

                <!-- Interactive Visual Graphic Pill Bar -->
                <div class="pt-4 grid grid-cols-3 gap-3 text-center">
                  <div class="bg-card p-3 rounded-xl border border-border/60">
                    <div class="text-xs font-bold text-[#00D084]">100%</div>
                    <div class="text-[10px] text-muted-foreground">Rigueur LMD</div>
                  </div>
                  <div class="bg-card p-3 rounded-xl border border-border/60">
                    <div class="text-xs font-bold text-[#00D084]">Instant</div>
                    <div class="text-[10px] text-muted-foreground">Mise en page</div>
                  </div>
                  <div class="bg-card p-3 rounded-xl border border-border/60">
                    <div class="text-xs font-bold text-[#00D084]">PDF / PPTX</div>
                    <div class="text-[10px] text-muted-foreground">Formats</div>
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
export class HowItWorksComponent {
  public activeStep: number = 1;

  public steps: Step[] = [
    {
      id: 1,
      number: '01',
      title: 'Entrez votre sujet',
      description: 'Saisissez la thématique de votre exposé et quelques mots-clés.',
      previewTitle: 'Saisie du sujet & thématique',
      previewDesc: 'Entrez un sujet complexe (ex: "Enjeux géopolitiques de la transition énergétique") et l\'IA initialise la recherche.',
      previewTag: 'Recherche active'
    },
    {
      id: 2,
      number: '02',
      title: 'L\'IA analyse et structure',
      description: 'Notre modèle génère un plan détaillé et rédige le contenu clé.',
      previewTitle: 'Génération du plan académique',
      previewDesc: 'Création instantanée d\'une introduction, problématique, plan en 3 parties et conclusion synthétique.',
      previewTag: 'Analyse 100%'
    },
    {
      id: 3,
      number: '03',
      title: 'Personnalisez le design',
      description: 'Ajustez les couleurs, polices et images en quelques clics.',
      previewTitle: 'Édition & Mise en page',
      previewDesc: 'Appliquez la charte graphique de votre université ou école avec des modèles modernes et élégants.',
      previewTag: 'Design personnalisé'
    },
    {
      id: 4,
      number: '04',
      title: 'Exportez en un clic',
      description: 'Téléchargez votre présentation finalisée au format désiré.',
      previewTitle: 'Exportation prête à présenter',
      previewDesc: 'Téléchargement direct au format PDF vectoriel, présentation PowerPoint PPTX ou partage direct par lien.',
      previewTag: 'Export instantané'
    }
  ];
}


