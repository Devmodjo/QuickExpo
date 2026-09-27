import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

interface FeatureItem {
  icon: IconName;
  tag: string;
  title: string;
  description: string;
  badge?: string;
  isLarge?: boolean;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="features" class="py-24 sm:py-32 relative overflow-hidden bg-background">
      <!-- Ambient light effect -->
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Supabase Header -->
        <div class="max-w-3xl mb-16 sm:mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-[#3ecf8e] border border-emerald-500/20 font-mono text-xs uppercase tracking-wider mb-4">
            <app-icon name="layers" [size]="14"></app-icon>
            <span>Écosystème & Modules</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight leading-[1.08]">
            L'arsenal complet pour vos présentations et mémoires.
          </h2>
          <p class="text-base sm:text-xl text-foreground/70 font-normal leading-relaxed">
            Chaque module est architecturé selon les exigences méthodologiques universitaires (LMD, APA, MLA) pour garantir une rigueur et une cohérence sans faille.
          </p>
        </div>

        <!-- Supabase Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Bento Feature 1: Large Featured Card (Spans 2 columns on lg) -->
          <div class="lg:col-span-2 supabase-card p-8 sm:p-10 rounded-2xl relative overflow-hidden group">
            <div class="flex flex-col h-full justify-between">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <div class="w-12 h-12 rounded-xl bg-emerald-500/15 text-[#3ecf8e] flex items-center justify-center">
                    <app-icon name="sparkles" [size]="24"></app-icon>
                  </div>
                  <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-[#3ecf8e] border border-emerald-500/20 font-semibold">
                    MOTEUR PRINCIPAL
                  </span>
                </div>

                <h3 class="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
                  Génération Structurée & Problématique Universitaire
                </h3>
                <p class="text-foreground/70 text-base leading-relaxed max-w-xl mb-6">
                  QuickExpo analyse méthodiquement votre thématique, dégage les axes directeurs et conçoit un plan équilibré en 2 ou 3 parties articulé avec des transitions académiques.
                </p>
              </div>

              <!-- Interactive Mockup inside the Bento Card -->
              <div class="mt-4 p-4 rounded-xl bg-[#09120f] border border-white/10 text-white font-mono text-xs overflow-hidden shadow-inner">
                <div class="flex items-center gap-2 text-white/40 pb-2 mb-3 border-b border-white/10">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span class="text-[11px] text-white/60 ml-2">prompt: &gt; Analyser sujet & générer problématique</span>
                </div>
                <div class="text-[#3ecf8e] font-semibold flex items-center gap-2">
                  <app-icon name="check" [size]="14"></app-icon>
                  <span>Problématique formulée : « En quoi la transformation numérique redéfinit-elle les modèles économiques circulaires ? »</span>
                </div>
                <div class="text-white/60 mt-1 pl-5">
                  Plan validé • 3 Parties • 6 Sous-parties • 24 Notions-clés indexées
                </div>
              </div>
            </div>
          </div>

          <!-- Bento Feature 2: Anti-Plagiat Card -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <app-icon name="shield-check" [size]="24"></app-icon>
                </div>
                <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-semibold">
                  100% ORIGINAL
                </span>
              </div>

              <h3 class="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                Garantie Zéro Plagiat
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed mb-6">
                Formulations uniques, synthèses analytiques inédites et respect absolu de l'éthique intellectuelle et académique.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <span class="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Score d'authenticité</span>
              <span class="font-mono font-black text-sm text-[#3ecf8e]">99.8%</span>
            </div>
          </div>

          <!-- Bento Feature 3: Studio Claude-Style -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <app-icon name="code" [size]="24"></app-icon>
                </div>
                <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold">
                  STUDIO LIVE
                </span>
              </div>

              <h3 class="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                Studio de Rédaction Assistée
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed mb-4">
                Éditeur interactif pour moduler le niveau de vocabulaire, étayer chaque argument et réécrire en un clic.
              </p>
            </div>

            <div class="space-y-1.5 font-mono text-xs text-muted-foreground">
              <div class="flex items-center gap-2">
                <app-icon name="check" [size]="14" className="text-[#3ecf8e]"></app-icon>
                <span>Niveaux Licence, Master, Doctorat</span>
              </div>
              <div class="flex items-center gap-2">
                <app-icon name="check" [size]="14" className="text-[#3ecf8e]"></app-icon>
                <span>Régénération ciblée par paragraphe</span>
              </div>
            </div>
          </div>

          <!-- Bento Feature 4: Bibliographie & Citations -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <app-icon name="book-open" [size]="24"></app-icon>
                </div>
                <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 font-semibold">
                  APA / HARVARD
                </span>
              </div>

              <h3 class="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                Références & Bibliographie
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed mb-4">
                Insertion transparente de citations scientifiques, références d'ouvrages et normes de référencement académique.
              </p>
            </div>

            <div class="p-2.5 rounded-lg bg-card/60 dark:bg-black/30 border border-border/50 text-[11px] font-mono text-muted-foreground truncate">
              [1] Dupont et al. (2024). Revue Éco. v.14.
            </div>
          </div>

          <!-- Bento Feature 5: Export Immédiat Vectoriel -->
          <div class="supabase-card p-8 sm:p-10 rounded-2xl relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
                  <app-icon name="download" [size]="24"></app-icon>
                </div>
                <span class="font-mono text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold">
                  PDF & WORD
                </span>
              </div>

              <h3 class="text-xl sm:text-2xl font-black text-foreground mb-3 tracking-tight">
                Export Vectoriel Haute Définition
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed mb-4">
                Exportez vos travaux finalisés au format PDF vectoriel conforme pour l'impression ou Word (.docx) pour une personnalisation locale.
              </p>
            </div>

            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded bg-muted text-[11px] font-mono font-bold">PDF Vectoriel</span>
              <span class="px-2.5 py-1 rounded bg-muted text-[11px] font-mono font-bold">Word .DOCX</span>
              <span class="px-2.5 py-1 rounded bg-muted text-[11px] font-mono font-bold">Diaporama</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class FeaturesComponent {}



