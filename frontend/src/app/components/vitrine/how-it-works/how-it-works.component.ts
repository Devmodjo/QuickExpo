import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="how-it-works" class="py-24 sm:py-32 bg-card/30 border-y border-border/50 relative overflow-hidden">
      <!-- Grid backdrop -->
      <div class="absolute inset-0 supabase-grid opacity-40 pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-[#3ecf8e] border border-emerald-500/20 font-mono text-xs uppercase tracking-wider mb-4">
            <app-icon name="terminal" [size]="14"></app-icon>
            <span>Architecture & Workflow</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight leading-[1.08]">
            Du sujet brut au document soutenable en 3 étapes.
          </h2>
          <p class="text-base sm:text-xl text-foreground/70 font-normal leading-relaxed">
            Un processus déterministe conçu pour garantir l'exactitude méthodologique et la fluidité de rédaction.
          </p>
        </div>

        <!-- 3 Step Interactive Architecture Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          
          <!-- Step 1 -->
          <div class="supabase-card p-8 rounded-2xl relative group flex flex-col justify-between">
            <div class="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-emerald-500/20 text-[#3ecf8e] border border-emerald-500/30 font-mono text-[11px] font-bold">
              ÉTAPE 01
            </div>

            <div class="mt-2 mb-6">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/15 text-[#3ecf8e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <app-icon name="file-text" [size]="28"></app-icon>
              </div>

              <h3 class="text-xl font-bold text-foreground mb-3 tracking-tight">
                Cadrage Thématique & Consignes
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed font-light mb-6">
                Renseignez votre sujet ou problématique, sélectionnez votre cycle d'études (Licence, Master, Thèse) et spécifiez vos attentes.
              </p>
            </div>

            <!-- Terminal mini preview -->
            <div class="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-[11px] text-white/70">
              <span class="text-[#3ecf8e]">$ quickexpo</span> init --subject "Économie Verte" --level master
            </div>
          </div>

          <!-- Step 2 -->
          <div class="supabase-card p-8 rounded-2xl relative group flex flex-col justify-between">
            <div class="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-emerald-500/20 text-[#3ecf8e] border border-emerald-500/30 font-mono text-[11px] font-bold">
              ÉTAPE 02
            </div>

            <div class="mt-2 mb-6">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/15 text-[#3ecf8e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <app-icon name="brain" [size]="28"></app-icon>
              </div>

              <h3 class="text-xl font-bold text-foreground mb-3 tracking-tight">
                Structuration & Génération IA
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed font-light mb-6">
                L'IA génère les axes majeurs, organise les transitions rhétoriques et rédige des analyses approfondies sourcées et vérifiées.
              </p>
            </div>

            <!-- Terminal mini preview -->
            <div class="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-[11px] text-white/70">
              <span class="text-[#3ecf8e]">✔</span> Plan équilibré (3 parties, 6 chapitres)
            </div>
          </div>

          <!-- Step 3 -->
          <div class="supabase-card p-8 rounded-2xl relative group flex flex-col justify-between">
            <div class="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-emerald-500/20 text-[#3ecf8e] border border-emerald-500/30 font-mono text-[11px] font-bold">
              ÉTAPE 03
            </div>

            <div class="mt-2 mb-6">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/15 text-[#3ecf8e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <app-icon name="check-circle" [size]="28"></app-icon>
              </div>

              <h3 class="text-xl font-bold text-foreground mb-3 tracking-tight">
                Studio Interactif & Export Final
              </h3>
              <p class="text-foreground/70 text-sm leading-relaxed font-light mb-6">
                Ajustez chaque paragraphe à votre plume dans notre studio visuel, insérez vos notes personnelles et exportez en PDF ou Word.
              </p>
            </div>

            <!-- Terminal mini preview -->
            <div class="p-3 rounded-lg bg-black/40 border border-white/10 font-mono text-[11px] text-white/70">
              <span class="text-[#3ecf8e]">✔</span> Exporte: memoire_final.pdf (Vectoriel)
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class HowItWorksComponent {}


