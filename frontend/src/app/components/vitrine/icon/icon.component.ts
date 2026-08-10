import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
  | 'zap'
  | 'brain'
  | 'eye'
  | 'layers'
  | 'shield-check'
  | 'graduation-cap'
  | 'book-open'
  | 'users'
  | 'briefcase'
  | 'file-text'
  | 'check-circle'
  | 'arrow-right'
  | 'arrow-up'
  | 'sun'
  | 'moon'
  | 'log-in'
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'mail'
  | 'chrome'
  | 'facebook'
  | 'x'
  | 'sparkles'
  | 'menu';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.class]="className"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <ng-container [ngSwitch]="name">
        <!-- ZAP -->
        <path *ngSwitchCase="'zap'" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />

        <!-- BRAIN -->
        <g *ngSwitchCase="'brain'">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M17.5 8a4.5 4.5 0 0 1-4.5 4.5" />
          <path d="M6.5 8a4.5 4.5 0 0 0 4.5 4.5" />
          <path d="M12 13v8" />
        </g>

        <!-- EYE -->
        <g *ngSwitchCase="'eye'">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </g>

        <!-- LAYERS -->
        <g *ngSwitchCase="'layers'">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </g>

        <!-- SHIELD CHECK -->
        <g *ngSwitchCase="'shield-check'">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </g>

        <!-- GRADUATION CAP -->
        <g *ngSwitchCase="'graduation-cap'">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </g>

        <!-- BOOK OPEN -->
        <g *ngSwitchCase="'book-open'">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </g>

        <!-- USERS -->
        <g *ngSwitchCase="'users'">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </g>

        <!-- BRIEFCASE -->
        <g *ngSwitchCase="'briefcase'">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </g>

        <!-- FILE TEXT -->
        <g *ngSwitchCase="'file-text'">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </g>

        <!-- CHECK CIRCLE -->
        <g *ngSwitchCase="'check-circle'">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </g>

        <!-- ARROW RIGHT -->
        <g *ngSwitchCase="'arrow-right'">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </g>

        <!-- ARROW UP -->
        <g *ngSwitchCase="'arrow-up'">
          <path d="m18 15-6-6-6 6" />
        </g>

        <!-- SUN -->
        <g *ngSwitchCase="'sun'">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </g>

        <!-- MOON -->
        <path *ngSwitchCase="'moon'" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />

        <!-- LOG IN -->
        <g *ngSwitchCase="'log-in'">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" x2="3" y1="12" y2="12" />
        </g>

        <!-- GITHUB -->
        <path *ngSwitchCase="'github'" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />

        <!-- TWITTER -->
        <path *ngSwitchCase="'twitter'" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />

        <!-- LINKEDIN -->
        <g *ngSwitchCase="'linkedin'">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </g>

        <!-- MAIL -->
        <g *ngSwitchCase="'mail'">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </g>

        <!-- CHROME -->
        <g *ngSwitchCase="'chrome'">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="21.17" x2="12" y1="8" y2="8" />
          <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
          <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </g>

        <!-- FACEBOOK -->
        <path *ngSwitchCase="'facebook'" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />

        <!-- X (Close) -->
        <g *ngSwitchCase="'x'">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </g>

        <!-- SPARKLES -->
        <g *ngSwitchCase="'sparkles'">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </g>

        <!-- MENU -->
        <g *ngSwitchCase="'menu'">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </g>

        <!-- DEFAULT FALLBACK -->
        <circle *ngSwitchDefault cx="12" cy="12" r="10" />
      </ng-container>
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size: number = 20;
  @Input() className: string = 'inline-block';
}
