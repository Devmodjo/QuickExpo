import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="about" class="py-24 sm:py-32 bg-background border-b border-border/50 relative overflow-hidden">
      <!-- Glow ambient -->
      <div class="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Top Section: Mission & Asset Showcase -->
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
          
          <!-- Left Column (Story & Vision) -->
          <div class="lg:w-1/2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-[#3ecf8e] border border-emerald-500/20 font-mono text-xs uppercase tracking-wider mb-4">
              <app-icon name="shield-check" [size]="14"></app-icon>
              <span>Notre Mission Académique</span>
            </div>

            <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-[1.08] tracking-tight">
              Démocratiser l'excellence universitaire par la technologie.
            </h2>

            <div class="space-y-4 text-foreground/75 text-base sm:text-lg leading-relaxed font-light mb-8">
              <p>
                QuickExpo est né d'un constat simple : des milliers d'étudiants brillants perdent un temps précieux sur la recherche documentaire dispersée et les normes complexes de mise en page.
              </p>
              <p>
                Notre plateforme agit comme un mentor méthodologique infatigable : elle structure vos idées, stimule votre esprit critique et vous livre des exposés irréprochables prêts à présenter.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-card border border-border/70 flex items-center gap-3">
                <app-icon name="graduation-cap" [size]="24" className="text-[#3ecf8e] shrink-0"></app-icon>
                <div>
                  <div class="font-bold text-foreground text-sm">Standards LMD</div>
                  <div class="text-xs text-muted-foreground">Licence, Master & Thèse</div>
                </div>
              </div>
              <div class="p-4 rounded-xl bg-card border border-border/70 flex items-center gap-3">
                <app-icon name="shield-check" [size]="24" className="text-[#3ecf8e] shrink-0"></app-icon>
                <div>
                  <div class="font-bold text-foreground text-sm">Éthique & Rigueur</div>
                  <div class="text-xs text-muted-foreground">100% sans plagiat</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Visual Student Asset with Floating Supabase-Style Badges -->
          <div class="lg:w-1/2 w-full relative">
            <div class="relative mx-auto max-w-lg rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
              <!-- Glow back-shadow -->
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 to-teal-500/10 mix-blend-overlay z-10 pointer-events-none"></div>

              <!-- Real Student Asset -->
              <img
                src="/images/hero-student.jpg"
                alt="Étudiant QuickExpo"
                class="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              <!-- Floating Success Badge 1 (Bottom Left) -->
              <div class="absolute bottom-5 left-5 right-5 z-20 p-4 rounded-2xl bg-[#091511]/90 border border-[#3ecf8e]/40 backdrop-blur-xl shadow-2xl text-white">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-[#3ecf8e] flex items-center justify-center font-bold">
                      <app-icon name="check" [size]="18"></app-icon>
                    </div>
                    <div>
                      <div class="text-xs text-emerald-300 font-mono font-semibold">SOUTENANCE MASTER II VALIDÉE</div>
                      <div class="font-bold text-sm text-white">Note obtenue : 18.5 / 20</div>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded bg-emerald-500/20 text-[#3ecf8e] text-xs font-mono font-bold">Félicitations</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Supabase "Wall of Love" / Testimonial Cards using student assets -->
        <div class="pt-12 border-t border-border/50">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h3 class="font-display text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
              Adoré par les étudiants francophones
            </h3>
            <p class="text-foreground/70 text-sm">
              Découvrez les retours de ceux qui ont transformé leurs notes grâce à QuickExpo.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <!-- Review 1 -->
            <div class="supabase-card p-6 rounded-2xl flex flex-col justify-between">
              <div class="flex items-center gap-1 text-amber-400 mb-4">
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
              </div>
              <p class="text-foreground/80 text-sm leading-relaxed mb-6 font-light">
                « En Master de Droit, la rigueur de la démarche est primordiale. QuickExpo m'a guidée pas à pas pour établir un plan parfaitement équilibré avec des références doctrinales pertinentes. Mon professeur a salué la solidité de l'argumentation ! »
              </p>
              <div class="flex items-center gap-3 pt-4 border-t border-border/50">
                <img
                  src="/images/student-female.jpg"
                  alt="Amina"
                  class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div class="font-bold text-foreground text-sm">Amina K.</div>
                  <div class="text-xs text-muted-foreground font-mono">Master Droit des Affaires</div>
                </div>
              </div>
            </div>

            <!-- Review 2 -->
            <div class="supabase-card p-6 rounded-2xl flex flex-col justify-between">
              <div class="flex items-center gap-1 text-amber-400 mb-4">
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
                <app-icon name="star" [size]="16"></app-icon>
              </div>
              <p class="text-foreground/80 text-sm leading-relaxed mb-6 font-light">
                « Le studio interactif est remarquable. Le workflow étape par étape permet de garder le contrôle total sur son travail : les sources sont vérifiées, la progression est logique et le vocabulaire est véritablement académique. »
              </p>
              <div class="flex items-center gap-3 pt-4 border-t border-border/50">
                <img
                  src="/images/student-male.jpg"
                  alt="Thomas"
                  class="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div class="font-bold text-foreground text-sm">Thomas D.</div>
                  <div class="text-xs text-muted-foreground font-mono">Licence 3 Sciences Économiques</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class VisionComponent {}

