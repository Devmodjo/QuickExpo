import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl shadow-black/5"
      [ngClass]="{
        'transition-all duration-300 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1': hover,
        'shadow-primary/10': glow
      }"
      [class]="extraClass"
    >
      <!-- Gradient overlay for premium feel -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

      <!-- Content -->
      <div class="relative z-10 p-6 md:p-8">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class GlassCardComponent {
  @Input() hover: boolean = true;
  @Input() glow: boolean = false;
  @Input() extraClass: string = '';
}
