import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <footer class="relative border-t border-border/60 bg-card/60 backdrop-blur-xl">
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <!-- Brand Column (2 cols) -->
          <div class="lg:col-span-2 space-y-4">
            <a routerLink="/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center shadow-md text-white">
                <app-icon name="zap" [size]="20"></app-icon>
              </div>
              <span class="text-xl font-extrabold font-display tracking-tight text-foreground">
                Quick<span class="text-secondary">Expo</span>
              </span>
            </a>
            
            <p class="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Plateforme IA EdTech de référence pour la structuration, la rédaction et la mise en forme automatisée d'exposés, devoirs et travaux académiques.
            </p>

            <div class="flex items-center gap-3 pt-2">
              <a
                *ngFor="let social of socials"
                [href]="social.href"
                class="w-9 h-9 rounded-xl bg-muted/80 hover:bg-secondary hover:text-white flex items-center justify-center text-muted-foreground transition-all duration-200"
                [attr.aria-label]="social.icon"
              >
                <app-icon [name]="social.icon" [size]="16"></app-icon>
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
              Navigation
            </h4>
            <ul class="space-y-2.5 text-sm text-muted-foreground font-medium">
              <li><a href="#how-it-works" class="hover:text-secondary transition-colors">Comment ça marche</a></li>
              <li><a href="#features" class="hover:text-secondary transition-colors">Fonctionnalités</a></li>
              <li><a href="#vision" class="hover:text-secondary transition-colors">Notre Vision</a></li>
              <li><a href="#vision" class="hover:text-secondary transition-colors">Témoignages</a></li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
              Ressources & Guides
            </h4>
            <ul class="space-y-2.5 text-sm text-muted-foreground font-medium">
              <li><a href="#" class="hover:text-secondary transition-colors">Guide de rédaction LMD</a></li>
              <li><a href="#" class="hover:text-secondary transition-colors">Exemples d'exposés PDF</a></li>
              <li><a href="#" class="hover:text-secondary transition-colors">Normes de bibliographie APA</a></li>
              <li><a href="#" class="hover:text-secondary transition-colors">FAQ & Support client</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
              Contact & Siège
            </h4>
            <div class="space-y-3 text-sm text-muted-foreground font-medium">
              <a
                href="mailto:modjovictor5@gmail.com"
                class="flex items-center gap-2 hover:text-secondary transition-colors"
              >
                <app-icon name="mail" [size]="16" className="text-secondary"></app-icon>
                <span>modjovictor5&#64;gmail.com</span>
              </a>
              <div class="flex items-center gap-2 text-xs">
                <app-icon name="graduation-cap" [size]="16" className="text-secondary"></app-icon>
                <span>Yaoundé, Cameroun & Paris, France</span>
              </div>
              <div class="pt-2">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Systèmes opérationnels 24/7
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
          <p>© {{ currentYear }} QuickExpo AI. Tous droits réservés.</p>
          <div class="flex flex-wrap gap-6">
            <a href="#" class="hover:text-secondary transition-colors">Politique de confidentialité</a>
            <a href="#" class="hover:text-secondary transition-colors">Conditions générales d'utilisation</a>
            <a href="#" class="hover:text-secondary transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
  public socials: { icon: IconName; href: string }[] = [
    { icon: 'github', href: '#' },
    { icon: 'twitter', href: '#' },
    { icon: 'linkedin', href: '#' },
  ];
}

