import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FeaturesComponent } from './features/features.component';
import { VisionComponent } from './vision/vision.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { IconComponent } from './icon/icon.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    HowItWorksComponent,
    FeaturesComponent,
    VisionComponent,
    CtaComponent,
    FooterComponent,
    AuthModalComponent,
    IconComponent,
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-background relative text-foreground">
      <!-- Background effects -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <!-- Gradient orbs -->
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        
        <!-- Grid pattern -->
        <div 
          class="absolute inset-0 opacity-[0.02]"
          style="background-image: linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px); background-size: 50px 50px;"
        ></div>
      </div>

      <!-- Navigation -->
      <app-navbar (openAuth)="isAuthModalOpen = true"></app-navbar>

      <!-- Main Showcase Content -->
      <main class="flex-1 pt-24 relative z-10">
        <app-hero (openAuth)="isAuthModalOpen = true"></app-hero>
        <app-how-it-works></app-how-it-works>
        <app-features></app-features>
        <app-vision></app-vision>
        <app-cta (openAuth)="isAuthModalOpen = true"></app-cta>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>

      <!-- Auth Modal -->
      <app-auth-modal
        [isOpen]="isAuthModalOpen"
        (closeModal)="isAuthModalOpen = false"
      ></app-auth-modal>

      <!-- Scroll To Top Button -->
      <div *ngIf="showScrollTop" class="fixed bottom-8 right-8 z-50 animate-scaleUp">
        <button
          (click)="scrollToTop()"
          class="rounded-full w-12 h-12 bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm border border-white/10 text-primary-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Retour en haut"
        >
          <app-icon name="arrow-up" [size]="20"></app-icon>
        </button>
      </div>
    </div>
  `
})
export class VitrineComponent implements OnInit, OnDestroy {
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  public isAuthModalOpen: boolean = false;
  public showScrollTop: boolean = false;
  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    // Excellent SEO practices setup
    this.seoService.setPageSeo({
      title: 'Assistant IA Méthodologique & Rédaction d Exposés',
      description:
        'QuickExpo vous aide à structurer, rédiger et mettre en forme vos exposés et documents techniques. Gagnez du temps sur la forme pour vous concentrer sur le fond.',
      keywords:
        'QuickExpo, assistant méthodologique, rédaction d exposés, structuration devoirs, éducation IA, preview exposé, anti-plagiat, académique',
      ogUrl: 'https://quickexpo.ai',
    });

    if (isPlatformBrowser(this.platformId)) {
      this.scrollListener = () => {
        this.showScrollTop = window.scrollY > 300;
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  public scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
