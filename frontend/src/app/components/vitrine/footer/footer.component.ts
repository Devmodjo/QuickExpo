import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <footer class="border-t border-border/50 bg-background/90 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/50">
          
          <!-- Brand Column -->
          <div class="md:col-span-5 space-y-4">
            <a routerLink="/" class="flex items-center gap-3 group">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0d2d2d] to-[#00D084] p-0.5 flex items-center justify-center text-white">
                <div class="w-full h-full bg-[#0c1f1d] rounded-[10px] flex items-center justify-center">
                  <app-icon name="sparkles" [size]="18" className="text-[#00D084]"></app-icon>
                </div>
              </div>
              <span class="text-xl font-black italic tracking-tighter text-foreground">
                Quick<span class="text-[#00D084]">Expo</span>
              </span>
            </a>
            
            <p class="text-sm text-foreground/60 leading-relaxed max-w-sm font-light">
              La plateforme définitive propulsée par l'intelligence artificielle pour concevoir, structurer et rédiger tous vos travaux académiques sans compromis sur l'excellence.
            </p>
          </div>

          <!-- Product Links -->
          <div class="md:col-span-4 space-y-3">
            <h4 class="font-bold text-xs uppercase tracking-[0.2em] text-[#00D084]">
              Navigation
            </h4>
            <ul class="space-y-2.5 text-sm text-foreground/70 font-medium">
              <li><a href="#features" class="hover:text-[#00D084] transition-colors">Fonctionnalités & Écosystème</a></li>
              <li><a href="#how-it-works" class="hover:text-[#00D084] transition-colors">Processus en 3 étapes</a></li>
              <li><a href="#pricing" class="hover:text-[#00D084] transition-colors">Tarifs & Offres Étudiantes</a></li>
              <li><a href="#about" class="hover:text-[#00D084] transition-colors">À propos & Engagement</a></li>
              <li><a href="#faq" class="hover:text-[#00D084] transition-colors">Foire aux questions (FAQ)</a></li>
            </ul>
          </div>

          <!-- Legal & Info -->
          <div class="md:col-span-3 space-y-3">
            <h4 class="font-bold text-xs uppercase tracking-[0.2em] text-[#00D084]">
              Légal & Éthique
            </h4>
            <ul class="space-y-2.5 text-sm text-foreground/70 font-medium">
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Charte Éthique IA</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Conditions Générales</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Protection des Données</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Sécurité & Confidentialité</a></li>
            </ul>
          </div>

        </div>

        <!-- Copyright Row with Supabase Operational Status -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60 font-light">
          <p>© {{ currentYear }} QuickExpo Hub. Tous droits réservés.</p>
          <div class="flex items-center gap-6 text-xs">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#3ecf8e] font-mono text-[11px]">
              <span class="w-2 h-2 rounded-full bg-[#3ecf8e] animate-pulse"></span>
              <span>Tous les systèmes opérationnels</span>
            </div>
            <span>Excellence & Méthodologie IA</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}


