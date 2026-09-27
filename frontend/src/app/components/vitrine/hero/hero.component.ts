import { Component, Output, EventEmitter, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:pb-24 overflow-hidden bg-background">
      <!-- Supabase Matrix Grid Pattern -->
      <div class="absolute inset-0 supabase-grid opacity-60 pointer-events-none z-0"></div>

      <!-- Ambient Radial Emerald Glows (Supabase signature) -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/15 dark:bg-[#3ecf8e]/12 blur-[130px] rounded-full pointer-events-none z-0"></div>
      <div class="absolute -top-20 right-10 w-[400px] h-[400px] bg-teal-600/10 dark:bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <!-- Hero Background Image with High-Contrast Dark Gradient Treatment -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/groupe etudiant banner.jpg"
          alt="Étudiants QuickExpo"
          class="w-full h-full object-cover object-center opacity-15 dark:opacity-20 scale-105 filter contrast-125"
        />
        <!-- Multi-layer high-contrast overlay so image never bleeds into text or metrics -->
        <div class="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div class="absolute inset-0 bg-radial from-transparent via-background/80 to-background"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 relative z-10">
        <div class="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <!-- Supabase-style Pill Announcement Badge -->
          <div
            (click)="openAuth.emit()"
            class="cursor-pointer group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-card/90 dark:bg-[#121c19]/90 border border-emerald-600/30 dark:border-[#3ecf8e]/30 text-xs font-semibold text-emerald-800 dark:text-[#3ecf8e] mb-8 backdrop-blur-xl shadow-lg hover:border-[#3ecf8e]/60 hover:scale-[1.02] transition-all"
          >
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-[#3ecf8e]">
              <app-icon name="sparkles" [size]="12"></app-icon>
            </span>
            <span class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">v2.5</span>
            <span class="h-3 w-px bg-border"></span>
            <span class="font-medium">Workflow méthodique pour documents académiques structurés</span>
            <app-icon name="arrow-right" [size]="13" className="group-hover:translate-x-1 transition-transform"></app-icon>
          </div>

          <!-- Main Bold Headline (Supabase high-contrast style) -->
          <h1 class="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-foreground mb-6 leading-[1.05]">
            Structurez vos travaux académiques <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-[#00D084] to-teal-500 dark:from-[#3ecf8e] dark:via-emerald-300 dark:to-teal-200">
              selon un workflow rigoureux.
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-base sm:text-lg md:text-xl text-foreground/75 mb-10 leading-relaxed max-w-2xl mx-auto font-normal">
            De la problématique initiale à la soutenance : une méthode guidée pour bâtir des plans équilibrés, des analyses étayées et des bibliographies conformes aux normes universitaires.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12">
            <button
              (click)="openAuth.emit()"
              class="w-full sm:w-auto btn-emerald text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02]"
            >
              <span>Démarrer gratuitement</span>
              <app-icon name="arrow-right" [size]="18"></app-icon>
            </button>

            <a href="#demo" class="w-full sm:w-auto">
              <button
                class="w-full sm:w-auto px-7 py-4 border border-border/80 bg-card/80 hover:bg-muted/70 backdrop-blur-md text-foreground rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2.5 hover:border-emerald-500/40"
              >
                <app-icon name="play" [size]="15" className="text-[#00D084]"></app-icon>
                <span>Voir la démo interactive</span>
              </button>
            </a>
          </div>

          <!-- Social Proof Avatars (Using Student Assets) -->
          <div class="flex items-center gap-4 mb-16 py-2 px-4 rounded-full bg-card/60 dark:bg-[#121c19]/60 border border-border/50 backdrop-blur-md">
            <div class="flex -space-x-2.5 overflow-hidden">
              <img
                src="/images/student-female.jpg"
                alt="Étudiante"
                class="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
              />
              <img
                src="/images/student-male.jpg"
                alt="Étudiant"
                class="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover"
              />
              <div class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white ring-2 ring-background">
                +15k
              </div>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-foreground/80 font-medium">
              <div class="flex text-amber-400">
                <app-icon name="star" [size]="14"></app-icon>
                <app-icon name="star" [size]="14"></app-icon>
                <app-icon name="star" [size]="14"></app-icon>
                <app-icon name="star" [size]="14"></app-icon>
                <app-icon name="star" [size]="14"></app-icon>
              </div>
              <span class="text-foreground/90 font-bold">4.9/5</span>
              <span class="text-muted-foreground hidden sm:inline">• Recommandé par les étudiants francophones</span>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- HIGH-CONTRAST METRICS CARDS WITH VIVID PROGRESSIVE ANIMATION  -->
          <!-- ============================================================= -->
          <div
            #metricsContainer
            class="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2"
          >
            <!-- Card 1: Documents Générés -->
            <div class="supabase-card p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden border border-emerald-500/25 shadow-xl bg-card/95 dark:bg-[#0c1815]/95">
              <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              
              <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#00D084] dark:text-[#3ecf8e] flex items-center justify-center mb-3">
                <app-icon name="file-text" [size]="20"></app-icon>
              </div>

              <!-- Animated Number Display -->
              <div class="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-foreground tracking-tight count-animate flex items-baseline justify-center">
                <span>{{ displayDocCount() }}</span>
                <span class="text-[#00D084] dark:text-[#3ecf8e] text-xl sm:text-2xl font-bold ml-0.5">+</span>
              </div>
              
              <div class="text-xs sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                Documents rédigés
              </div>
            </div>

            <!-- Card 2: Étudiants & Chercheurs -->
            <div class="supabase-card p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden border border-emerald-500/25 shadow-xl bg-card/95 dark:bg-[#0c1815]/95">
              <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-teal-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              
              <div class="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
                <app-icon name="users" [size]="20"></app-icon>
              </div>

              <!-- Animated Number Display -->
              <div class="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-foreground tracking-tight count-animate flex items-baseline justify-center">
                <span>{{ displayStudentCount() }}</span>
                <span class="text-teal-600 dark:text-teal-400 text-xl sm:text-2xl font-bold ml-0.5">+</span>
              </div>
              
              <div class="text-xs sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                Étudiants & Chercheurs
              </div>
            </div>

            <!-- Card 3: Note de satisfaction -->
            <div class="supabase-card p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden border border-emerald-500/25 shadow-xl bg-card/95 dark:bg-[#0c1815]/95">
              <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              
              <div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center mb-3">
                <app-icon name="star" [size]="20"></app-icon>
              </div>

              <!-- Animated Number Display -->
              <div class="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-foreground tracking-tight count-animate flex items-baseline justify-center">
                <span>{{ displayRating() }}</span>
                <span class="text-muted-foreground text-sm font-medium ml-1">/ 5</span>
              </div>
              
              <div class="text-xs sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                Satisfaction moyenne
              </div>
            </div>

            <!-- Card 4: Taux anti-plagiat originalité -->
            <div class="supabase-card p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden border border-emerald-500/25 shadow-xl bg-card/95 dark:bg-[#0c1815]/95">
              <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              
              <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#00D084] dark:text-[#3ecf8e] flex items-center justify-center mb-3">
                <app-icon name="shield-check" [size]="20"></app-icon>
              </div>

              <!-- Animated Number Display -->
              <div class="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-foreground tracking-tight count-animate flex items-baseline justify-center">
                <span>{{ displayOriginality() }}</span>
                <span class="text-[#00D084] dark:text-[#3ecf8e] text-xl sm:text-2xl font-bold ml-0.5">%</span>
              </div>
              
              <div class="text-xs sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">
                Originalité certifiée
              </div>
            </div>
          </div>

        </div>

        <!-- ============================================================= -->
        <!-- SUPABASE-STYLE INTERACTIVE STUDIO / CODE PLAYGROUND PREVIEW   -->
        <!-- ============================================================= -->
        <div id="demo" class="mt-20 max-w-5xl mx-auto">
          <div class="rounded-2xl border border-emerald-500/30 bg-[#0d1613] text-white shadow-2xl overflow-hidden">
            <!-- Studio Header bar -->
            <div class="flex items-center justify-between px-5 py-3.5 bg-[#09110e] border-b border-white/10">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span class="ml-3 font-mono text-xs text-white/50 hidden sm:inline">quickexpo-studio/projet-2026</span>
              </div>

              <!-- Interactive Tabs -->
              <div class="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg border border-white/10 text-xs">
                <button
                  (click)="activeTab.set('plan')"
                  [class.bg-[#3ecf8e]]="activeTab() === 'plan'"
                  [class.text-black]="activeTab() === 'plan'"
                  [class.text-white/70]="activeTab() !== 'plan'"
                  class="px-3 py-1 rounded-md font-semibold transition-all"
                >
                  Plan & Structure
                </button>
                <button
                  (click)="activeTab.set('redaction')"
                  [class.bg-[#3ecf8e]]="activeTab() === 'redaction'"
                  [class.text-black]="activeTab() === 'redaction'"
                  [class.text-white/70]="activeTab() !== 'redaction'"
                  class="px-3 py-1 rounded-md font-semibold transition-all"
                >
                  Rédaction IA
                </button>
                <button
                  (click)="activeTab.set('sources')"
                  [class.bg-[#3ecf8e]]="activeTab() === 'sources'"
                  [class.text-black]="activeTab() === 'sources'"
                  [class.text-white/70]="activeTab() !== 'sources'"
                  class="px-3 py-1 rounded-md font-semibold transition-all"
                >
                  Sources
                </button>
                <button
                  (click)="activeTab.set('export')"
                  [class.bg-[#3ecf8e]]="activeTab() === 'export'"
                  [class.text-black]="activeTab() === 'export'"
                  [class.text-white/70]="activeTab() !== 'export'"
                  class="px-3 py-1 rounded-md font-semibold transition-all"
                >
                  Export
                </button>
              </div>

              <div class="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>En direct</span>
              </div>
            </div>

            <!-- Studio Body Content -->
            <div class="p-6 sm:p-8 font-mono text-sm">
              <!-- Tab 1: Plan & Structure -->
              @if (activeTab() === 'plan') {
                <div class="space-y-4 animate-fadeIn">
                  <div class="flex items-center justify-between text-xs text-white/50 pb-2 border-b border-white/10">
                    <span>SUJET: L'impact de la transition énergétique sur l'économie verte (Master)</span>
                    <span class="text-[#3ecf8e]">Plan structuré • 3 parties validées</span>
                  </div>

                  <div class="space-y-3">
                    <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div class="flex items-center gap-2 text-[#3ecf8e] font-bold">
                        <app-icon name="check-circle" [size]="16"></app-icon>
                        <span>I. Les Fondements Économiques de la Décarbonation</span>
                      </div>
                      <p class="text-xs text-white/60 mt-1 pl-6">
                        A. Dynamique des investissements verts • B. Cadre réglementaire et fiscalité carbone
                      </p>
                    </div>

                    <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div class="flex items-center gap-2 text-[#3ecf8e] font-bold">
                        <app-icon name="check-circle" [size]="16"></app-icon>
                        <span>II. Opportunités Stratégiques et Nouveaux Marchés</span>
                      </div>
                      <p class="text-xs text-white/60 mt-1 pl-6">
                        A. Création d'emplois durables • B. Souveraineté technologique et compétitivité
                      </p>
                    </div>

                    <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div class="flex items-center gap-2 text-[#3ecf8e] font-bold">
                        <app-icon name="check-circle" [size]="16"></app-icon>
                        <span>III. Défis Structurels et Recommandations Opérationnelles</span>
                      </div>
                      <p class="text-xs text-white/60 mt-1 pl-6">
                        A. Gestion des coûts de transition • B. Feuille de route pour les décideurs
                      </p>
                    </div>
                  </div>
                </div>
              }

              <!-- Tab 2: Rédaction IA -->
              @if (activeTab() === 'redaction') {
                <div class="space-y-4 animate-fadeIn">
                  <div class="flex items-center justify-between text-xs text-white/50 pb-2 border-b border-white/10">
                    <span>EXTRAIT RÉDIGÉ • STYLE ACADÉMIQUE NORME LMD</span>
                    <span class="text-[#3ecf8e] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Anti-plagiat: 100% Original</span>
                  </div>

                  <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-white/90 leading-relaxed font-sans text-sm sm:text-base">
                    « L'accélération de la transition énergétique ne constitue plus une simple contrainte écologique, mais s'affirme comme le principal vecteur de réindustrialisation durable des économies contemporaines. En redéfinissant la chaîne de valeur productive, les investissements bas-carbone catalysent une dynamique d'innovation schumpétérienne sans précédent... »
                  </div>

                  <div class="flex items-center gap-3 text-xs text-white/60 font-mono">
                    <span class="px-2 py-1 bg-white/10 rounded">3 450 mots</span>
                    <span class="px-2 py-1 bg-white/10 rounded">18 références citées</span>
                    <span class="text-[#3ecf8e]">Prêt pour validation</span>
                  </div>
                </div>
              }

              <!-- Tab 3: Sources -->
              @if (activeTab() === 'sources') {
                <div class="space-y-3 animate-fadeIn">
                  <div class="text-xs text-white/50 pb-2 border-b border-white/10">
                    BIBLIOGRAPHIE NORMALISÉE APA 7e ÉDITION (EXTRAIT)
                  </div>
                  <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 space-y-2">
                    <p>• Stern, N. (2023). <em>The Economics of Climate Change: The Stern Review</em>. Cambridge University Press.</p>
                    <p>• Agence Internationale de l'Énergie (AIE). (2024). <em>World Energy Outlook 2024</em>. Paris: OECD/IEA.</p>
                    <p>• Banque Mondiale. (2025). <em>State and Trends of Carbon Pricing</em>. Washington, DC: World Bank.</p>
                  </div>
                </div>
              }

              <!-- Tab 4: Export -->
              @if (activeTab() === 'export') {
                <div class="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 animate-fadeIn">
                  <div class="w-16 h-20 bg-red-500/20 border border-red-500/40 rounded-lg flex flex-col items-center justify-center text-red-400 font-bold shrink-0">
                    <app-icon name="file-text" [size]="24"></app-icon>
                    <span class="text-[10px] mt-1">PDF</span>
                  </div>
                  <div class="flex-1 text-center sm:text-left">
                    <div class="font-sans font-bold text-white text-base">Exposé_Transition_Energetique_Master.pdf</div>
                    <div class="text-xs text-white/50 mt-1 font-mono">24 pages • Sommaire cliquable • Page de garde incluse • 4.2 Mo</div>
                  </div>
                  <button
                    (click)="openAuth.emit()"
                    class="btn-emerald text-white px-5 py-2.5 rounded-lg text-xs font-bold font-sans flex items-center gap-2"
                  >
                    <app-icon name="download" [size]="14"></app-icon>
                    <span>Télécharger</span>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  @Output() openAuth = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);

  public activeTab = signal<'plan' | 'redaction' | 'sources' | 'export'>('plan');

  // Signals for smoothly animated numbers
  public displayDocCount = signal<string>('0');
  public displayStudentCount = signal<string>('0');
  public displayRating = signal<string>('0.0');
  public displayOriginality = signal<string>('0.0');

  private animationStarted = false;
  private observer: IntersectionObserver | null = null;
  private rafId: number | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    }
  }

  private setupIntersectionObserver(): void {
    const el = this.elementRef.nativeElement.querySelector('#metricsContainer') ||
               this.elementRef.nativeElement.querySelector('.grid');

    if (!el || typeof IntersectionObserver === 'undefined') {
      this.startCountersAnimation();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationStarted) {
          this.startCountersAnimation();
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.15 });

    this.observer.observe(el);
  }

  private startCountersAnimation(): void {
    if (this.animationStarted) return;
    this.animationStarted = true;

    const duration = 2200; // ms
    const startTime = performance.now();

    const targetDocs = 50000;
    const targetStudents = 15000;
    const targetRating = 4.9;
    const targetOriginality = 99.8;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easeOutCubic(rawProgress);

      // 1. Doc count (e.g. 0 -> 50 000)
      const currentDocs = Math.floor(progress * targetDocs);
      this.displayDocCount.set(this.formatNumber(currentDocs));

      // 2. Student count (e.g. 0 -> 15 000)
      const currentStudents = Math.floor(progress * targetStudents);
      this.displayStudentCount.set(this.formatNumber(currentStudents));

      // 3. Rating (0.0 -> 4.9)
      const currentRating = (progress * targetRating).toFixed(1);
      this.displayRating.set(currentRating);

      // 4. Originality (0.0 -> 99.8)
      const currentOriginality = (progress * targetOriginality).toFixed(1);
      this.displayOriginality.set(currentOriginality);

      if (rawProgress < 1) {
        this.rafId = requestAnimationFrame(updateFrame);
      } else {
        // Final values
        this.displayDocCount.set(this.formatNumber(targetDocs));
        this.displayStudentCount.set(this.formatNumber(targetStudents));
        this.displayRating.set(targetRating.toFixed(1));
        this.displayOriginality.set(targetOriginality.toFixed(1));
      }
    };

    this.rafId = requestAnimationFrame(updateFrame);
  }

  private formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
  }
}





