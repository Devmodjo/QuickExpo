import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="faq" class="py-24 sm:py-28 relative overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header (cmdrivehub style) -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span class="text-[10px] font-black text-[#00D084] uppercase tracking-[0.3em] mb-4 block">
            Support
          </span>
          <h3 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight leading-[1.1]">
            Questions Fréquentes
          </h3>
          <p class="text-lg sm:text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
            Tout ce que vous devez savoir pour démarrer et exceller sereinement avec QuickExpo.
          </p>
        </div>

        <!-- Accordion List -->
        <div class="max-w-3xl mx-auto space-y-4">
          <div
            *ngFor="let item of faqItems"
            class="bg-card border border-border/70 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00D084]/40 shadow-xs"
          >
            <button
              type="button"
              (click)="toggle(item.id)"
              class="w-full px-6 py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer"
            >
              <span class="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-[#00D084] transition-colors pr-4">
                {{ item.question }}
              </span>
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center bg-muted/80 shrink-0 transition-transform duration-300 text-foreground/60"
                [class.rotate-180]="openId() === item.id"
              >
                <app-icon name="chevron-down" [size]="18"></app-icon>
              </div>
            </button>

            @if (openId() === item.id) {
              <div class="px-6 pb-6 pt-1 text-sm sm:text-base text-foreground/70 leading-relaxed border-t border-border/40 font-light animate-fadeIn">
                {{ item.answer }}
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `
})
export class FaqComponent {
  public openId = signal<number | null>(1);

  public faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'Les documents générés sont-ils garantis sans plagiat ?',
      answer: 'Absolument. QuickExpo utilise des algorithmes avancés pour formuler des synthèses et analyses originales. Chaque document est rédigé ex-nihilo et calibré selon les exigences méthodologiques universitaires, avec citation appropriée des sources.'
    },
    {
      id: 2,
      question: 'Puis-je modifier le plan et chaque section avant l\'export ?',
      answer: 'Oui, c\'est tout l\'intérêt de notre Studio de Création interactif ! Dès que le plan est structuré, vous pouvez régénérer des sections, ajuster la tonalité, ajouter vos propres idées et dialoguer avec l\'assistant IA pour perfectionner votre travail.'
    },
    {
      id: 3,
      question: 'Quels sont les formats d\'exportation supportés ?',
      answer: 'QuickExpo permet le téléchargement direct au format PDF vectoriel haute définition (idéal pour l\'impression ou l\'envoi aux professeurs) ainsi qu\'au format Microsoft Word (.docx) pour une édition locale.'
    },
    {
      id: 4,
      question: 'QuickExpo est-il adapté à tous les niveaux d\'études ?',
      answer: 'Oui, QuickExpo s\'adapte aux niveaux Enseignement secondaire, Licence, Master et Doctorat. Le vocabulaire, la rigueur conceptuelle et la profondeur de l\'argumentation sont automatiquement ajustés au niveau sélectionné.'
    },
    {
      id: 5,
      question: 'Comment débuter gratuitement ?',
      answer: 'Cliquez simplement sur « Commencer gratuitement » ou « S\'inscrire ». Vous pourrez créer votre premier projet en quelques clics sans renseigner de carte bancaire.'
    }
  ];

  toggle(id: number): void {
    this.openId.set(this.openId() === id ? null : id);
  }
}
