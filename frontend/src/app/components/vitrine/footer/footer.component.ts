import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <footer class="relative border-t border-border/50 bg-card/60 backdrop-blur-xl py-14">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/50">
          
          <!-- Brand Column from Mockup (5 cols) -->
          <div class="md:col-span-6 space-y-4">
            <a routerLink="/" class="flex items-center gap-2.5 group">
              <div class="w-8 h-8 rounded-full bg-[#00D084] flex items-center justify-center text-white shadow-md">
                <app-icon name="sparkles" [size]="16"></app-icon>
              </div>
              <span class="text-xl font-black font-display tracking-tight text-foreground">
                Quick<span class="text-[#00D084]">Expo</span>
              </span>
            </a>
            
            <p class="text-sm text-muted-foreground leading-relaxed max-w-sm font-normal">
              La plateforme propulsée par l'IA pour tous vos travaux académiques et professionnels.
            </p>
          </div>

          <!-- Product Column from Mockup (3 cols) -->
          <div class="md:col-span-3 space-y-3">
            <h4 class="font-bold text-xs uppercase tracking-wider text-foreground">
              PRODUIT
            </h4>
            <ul class="space-y-2 text-sm text-muted-foreground font-medium">
              <li><a href="#features" class="hover:text-[#00D084] transition-colors">Features</a></li>
              <li><a href="#pricing" class="hover:text-[#00D084] transition-colors">Pricing</a></li>
              <li><a href="#about" class="hover:text-[#00D084] transition-colors">About</a></li>
            </ul>
          </div>

          <!-- Links & Legal Column from Mockup (3 cols) -->
          <div class="md:col-span-3 space-y-3">
            <h4 class="font-bold text-xs uppercase tracking-wider text-foreground">
              LIENS & LÉGAL
            </h4>
            <ul class="space-y-2 text-sm text-muted-foreground font-medium">
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">Twitter</a></li>
              <li><a href="#" class="hover:text-[#00D084] transition-colors">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        <!-- Copyright Row from Mockup -->
        <div class="pt-8 text-xs text-muted-foreground font-medium">
          <p>© {{ currentYear }} QuickExpo Inc. All rights reserved.</p>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}


