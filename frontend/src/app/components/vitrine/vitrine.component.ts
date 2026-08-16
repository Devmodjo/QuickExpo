import { Component, OnInit, OnDestroy, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
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
      <!-- Ambient Background Effect -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#00D084]/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 -left-40 w-80 h-80 bg-[#00D084]/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Navigation -->
      <app-navbar (openAuth)="isAuthModalOpen = true"></app-navbar>

      <!-- Main Showcase Content -->
      <main class="flex-1 relative z-10">
        <app-hero (openAuth)="isAuthModalOpen = true"></app-hero>
        
        <div id="features">
          <app-features></app-features>
        </div>

        <div id="how-it-works">
          <app-how-it-works></app-how-it-works>
        </div>
 
        <div id="about">
          <app-vision></app-vision>
        </div>
 
        <div id="pricing">
          <app-cta (openAuth)="isAuthModalOpen = true"></app-cta>
        </div>
      </main>
  
      <!-- Footer -->
      <app-footer></app-footer>

      <!-- Auth Modal -->
      <app-auth-modal
        [isOpen]="isAuthModalOpen"
        (closeModal)="isAuthModalOpen = false"
      ></app-auth-modal>

      <!-- Scroll To Top Button -->
      <div *ngIf="showScrollTop" class="fixed bottom-8 right-8 z-50">
        <button
          (click)="scrollToTop()"
          class="rounded-full w-11 h-11 bg-[#00D084] hover:bg-[#00B874] shadow-lg text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Retour en haut"
        >
          <app-icon name="arrow-up" [size]="18"></app-icon>
        </button>
      </div>
    </div>
  `
})
export class VitrineComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  public isAuthModalOpen: boolean = false;
  public showScrollTop: boolean = false;
  private scrollListener: (() => void) | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'QuickExpo - Générez vos exposés en quelques secondes avec l\'IA',
      description:
        'De la recherche de données à la mise en page finale, QuickExpo s\'occupe de tout pour vous offrir des présentations professionnelles et structurées.',
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initScrollReveal();
      }, 100);
    }
  }

  private initScrollReveal(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const targetElements = document.querySelectorAll(
      '.reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal-hero'
    );

    targetElements.forEach((el) => {
      this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  public scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}


