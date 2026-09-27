import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="pricing" class="py-24 sm:py-32 relative overflow-hidden bg-background border-b border-border/50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-[#3ecf8e] border border-emerald-500/20 font-mono text-xs uppercase tracking-wider mb-4">
            <app-icon name="check-circle" [size]="14"></app-icon>
            <span>Tarifs Prévisibles & Sans Surprise</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight leading-[1.08]">
            Investissez dans votre succès universitaire.
          </h2>
          <p class="text-base sm:text-xl text-foreground/70 font-normal leading-relaxed">
            Commencez gratuitement, passez au forfait Pro à votre rythme sans engagement de durée.
          </p>
        </div>

        <!-- 3 Supabase Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          <!-- Plan 1: Gratuit -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="mb-6">
                <span class="font-mono text-xs text-muted-foreground uppercase tracking-wider">TIER 01</span>
                <h3 class="font-display text-2xl font-bold text-foreground mt-1 mb-2">
                  Découverte
                </h3>
                <p class="text-foreground/70 text-xs leading-relaxed font-light">
                  Idéal pour explorer la puissance de QuickExpo et cadrer vos premiers devoirs.
                </p>
              </div>

              <div class="flex items-baseline gap-2 mb-6 pb-6 border-b border-border/60">
                <span class="font-display text-4xl sm:text-5xl font-black text-foreground">0</span>
                <span class="text-muted-foreground text-xs font-mono uppercase tracking-wider">FCFA / mois</span>
              </div>

              <ul class="space-y-3.5 mb-8">
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>3 documents académiques / mois</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Génération de plan en 2 ou 3 parties</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Export PDF standard</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Support communautaire Discord</span>
                </li>
              </ul>
            </div>

            <button
              (click)="openAuth.emit()"
              class="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-muted hover:bg-muted/80 text-foreground border border-border transition-all"
            >
              Démarrer Gratuitement
            </button>
          </div>

          <!-- Plan 2: Pro (Supabase featured card with green glow) -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl flex flex-col justify-between relative border-2 border-emerald-500/50 shadow-2xl dark:bg-[#0c1a16] glow-emerald">
            
            <!-- Featured Badge -->
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-600 text-white font-mono text-[11px] font-bold tracking-wider shadow-md whitespace-nowrap">
              POPULAIRE • SEMESTRE VALIDÉ
            </div>

            <div>
              <div class="mb-6 mt-2">
                <span class="font-mono text-xs text-[#3ecf8e] uppercase tracking-wider font-semibold">TIER 02 • ILLIMITÉ</span>
                <h3 class="font-display text-2xl font-bold text-foreground mt-1 mb-2">
                  Étudiant Pro
                </h3>
                <p class="text-foreground/70 text-xs leading-relaxed font-light">
                  L'arsenal complet pour vos mémoires, exposés approfondis et soutenances.
                </p>
              </div>

              <div class="flex items-baseline gap-2 mb-6 pb-6 border-b border-border/60">
                <span class="font-display text-4xl sm:text-5xl font-black text-[#00D084] dark:text-[#3ecf8e]">5.000</span>
                <span class="text-muted-foreground text-xs font-mono uppercase tracking-wider">FCFA / mois</span>
              </div>

              <ul class="space-y-3.5 mb-8">
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Générations illimitées</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Studio de Rédaction interactif</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Export PDF Vectoriel + Word (.docx)</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Anti-plagiat garanti & Certifié</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Références bibliographiques APA</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground font-medium">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Support prioritaire 7j/7</span>
                </li>
              </ul>
            </div>

            <button
              (click)="openAuth.emit()"
              class="w-full btn-emerald py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>Passer à Pro</span>
              <app-icon name="arrow-right" [size]="14"></app-icon>
            </button>
          </div>

          <!-- Plan 3: Campus & Écoles -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="mb-6">
                <span class="font-mono text-xs text-muted-foreground uppercase tracking-wider">TIER 03</span>
                <h3 class="font-display text-2xl font-bold text-foreground mt-1 mb-2">
                  Campus & Université
                </h3>
                <p class="text-foreground/70 text-xs leading-relaxed font-light">
                  Pour les laboratoires de recherche, associations étudiantes et départements universitaires.
                </p>
              </div>

              <div class="flex items-baseline gap-2 mb-6 pb-6 border-b border-border/60">
                <span class="font-display text-3xl sm:text-4xl font-black text-foreground">Sur mesure</span>
              </div>

              <ul class="space-y-3.5 mb-8">
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Gestion multi-comptes centralisée</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Modèles de chartes graphiques d'école</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>API et intégration ENT / Moodle</span>
                </li>
                <li class="flex items-center gap-3 text-sm text-foreground/80">
                  <app-icon name="check" [size]="16" className="text-[#3ecf8e] shrink-0"></app-icon>
                  <span>Formation et chef de projet dédié</span>
                </li>
              </ul>
            </div>

            <button
              (click)="openAuth.emit()"
              class="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-muted hover:bg-muted/80 text-foreground border border-border transition-all"
            >
              Contacter l'Équipe
            </button>
          </div>

        </div>

      </div>
    </section>
  `
})
export class PricingComponent {
  @Output() openAuth = new EventEmitter<void>();
}
