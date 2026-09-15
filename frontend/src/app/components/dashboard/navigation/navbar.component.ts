import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserResponseDto } from '../../../models/UserResponseDto';
import { SearchProjectComponent } from '../search-project/search-project.component';

@Component({
    standalone: true,
    selector: 'dashboard-navbar',
    imports: [CommonModule, SearchProjectComponent],
    template: `
        <button class="search-trigger" type="button" aria-label="Rechercher un projet" (click)="openSearch()">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5"></circle>
                <path d="M16 16L21 21"></path>
            </svg>
            <span>Rechercher</span>
        </button>

        @if (isSearchOpen) {
            <app-search-project [isOpen]="isSearchOpen" (close)="closeSearch()" />
        }

        <!-- Mobile Top App Bar (Visible on mobile screens < 768px) -->
        <div class="mobile-topbar">
            <div class="mobile-brand">
                <div class="avatar mobile-avatar">
                    <img *ngIf="!imageLoadFailed && getProfileImage(); else mobileInitials" [src]="getProfileImage()" [alt]="getDisplayName()" (error)="onImageError()" />
                    <ng-template #mobileInitials>{{ getUserInitials() }}</ng-template>
                </div>
                <div class="mobile-title">
                    <span class="workspace-name">{{ getDisplayName() }}</span>
                    <span class="workspace-badge">Pro</span>
                </div>
            </div>
            
            <button 
                class="burger-btn" 
                [class.active]="isMobileOpen" 
                (click)="toggleMobileMenu()" 
                [attr.aria-expanded]="isMobileOpen"
                aria-label="Toggle navigation menu">
                <span class="burger-bar top"></span>
                <span class="burger-bar middle"></span>
                <span class="burger-bar bottom"></span>
            </button>
        </div>

        <!-- Mobile Backdrop Overlay -->
        <div 
            class="mobile-backdrop" 
            [class.is-open]="isMobileOpen" 
            (click)="closeMobileMenu()"
            aria-hidden="true">
        </div>

        <!-- Sidebar / Mobile Drawer Navigation -->
        <aside class="sidebar" [class.mobile-open]="isMobileOpen">
            <div class="sidebar-header">
                <div class="avatar">
                    <img *ngIf="!imageLoadFailed && getProfileImage(); else sidebarInitials" [src]="getProfileImage()" [alt]="getDisplayName()" (error)="onImageError()" />
                    <ng-template #sidebarInitials>{{ getUserInitials() }}</ng-template>
                </div>
                <div class="user-info">
                    <div class="title">{{ getDisplayName() }}'s Workspace</div>
                    <button class="upgrade" (click)="closeMobileMenu()">Passez à la version supérieure</button>
                </div>
            </div>

            <nav class="sidebar-nav">
                <ul>
                    <li (click)="closeMobileMenu()">
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"></path>
                            </svg>
                        </span>
                        <span class="label">QuickExpo</span>
                    </li>
                    <li (click)="openSearch(); closeMobileMenu()">
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="7"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                        <span class="label">Recherche</span>
                    </li>
                    <li (click)="closeMobileMenu()">
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </span>
                        <span class="label">Partagés avec vous</span>
                    </li>
                    <li (click)="closeMobileMenu()">
                        <span class="icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M2 12h20"></path>
                                <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
                            </svg>
                        </span>
                        <span class="label">Sites</span>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <button class="trash" (click)="closeMobileMenu()">
                    <span class="icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                        </svg>
                    </span>
                    <span>Corbeille</span>
                </button>
            </div>
        </aside>
    `,
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit{

    isMobileOpen = false;
    isSearchOpen = false;
    imageLoadFailed = false;

    private authService = inject(AuthService);
    public userInfo = signal<UserResponseDto | null>(null);

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                this.userInfo.set(user);
                localStorage.setItem('user', JSON.stringify(user));
                // console.log(user);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getDisplayName(): string {
        return this.userInfo()?.fullName?.trim() || 'Utilisateur';
    }

    onImageError(): void {
        this.imageLoadFailed = true;
    }

    getProfileImage(): string | null {
        const url = this.userInfo()?.pictureUrl?.trim();

        if (!url) {
            this.imageLoadFailed = true;
            return null;
        }

        if (!/^https?:\/\//i.test(url) && !url.startsWith('data:image/')) {
            this.imageLoadFailed = true;
            return null;
        }

        this.imageLoadFailed = false;
        return url;
    }

    getUserInitials(): string {
        const fullName = this.userInfo()?.fullName?.trim() || this.userInfo()?.email?.trim() || 'Utilisateur';
        const parts = fullName.split(/\s+/).filter(Boolean);

        if (!parts.length) {
            return 'U';
        }

        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }

        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    toggleMobileMenu(): void {
        this.isMobileOpen = !this.isMobileOpen;
    }

    openSearch(): void {
        this.isSearchOpen = true;
    }

    closeSearch(): void {
        this.isSearchOpen = false;
    }

    closeMobileMenu(): void {
        this.isMobileOpen = false;
    }

    @HostListener('window:keydown.escape')
    onEscape(): void {
        if (this.isSearchOpen) {
            this.closeSearch();
            return;
        }

        if (this.isMobileOpen) {
            this.closeMobileMenu();
        }
    }
}
