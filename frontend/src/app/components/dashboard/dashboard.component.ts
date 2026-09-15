import { Component, HostBinding, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardThemeService } from '../../services/dashboard-theme.service';
import { NavBarComponent } from './navigation/navbar.component';
import { DashboardLayoutComponent } from './layout/layout.component';
import { ProjectSessionService } from '../../services/project-session.service';
import { ProjectSessionResponse } from '../../models/ProjectSessionResponse';
import { ProjectStatus } from '../../enum/ProjectStatus';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, NavBarComponent, DashboardLayoutComponent, RouterOutlet]
})
export class DashboardComponent implements OnInit {
    public readonly filters = ['Tous', 'En cours', 'Terminés', 'À vérifier'];
    public activeFilter = 'Tous';
    public viewMode: 'grid' | 'list' = 'grid';
    public projectSession = inject(ProjectSessionService);
    public projects = signal<ProjectSessionResponse[]>([]);

    ngOnInit(): void {
        this.projectSession.getProjectSession().subscribe({
            next: (projects) => {
                this.projects.set(Array.isArray(projects) ? projects : []);
            },
            error: (err) => {
                console.error(err);
                this.projects.set([]);
            }
        });
    }

    constructor(public dashboardTheme: DashboardThemeService) {}

    @HostBinding('class') get hostClasses(): string {
        return this.dashboardTheme.theme() === 'dark' ? 'dashboard-dark' : 'dashboard-light';
    }

    onFilterChange(filter: string): void {
        this.activeFilter = filter;
    }

    onViewModeChange(mode: 'grid' | 'list'): void {
        this.viewMode = mode;
    }

    get filteredProjects(): ProjectSessionResponse[] {
        const allProjects = this.projects();

        if (!allProjects.length) {
            return [];
        }

        switch (this.activeFilter) {
            case 'En cours':
                return allProjects.filter(
                    (project) => project.projectStatus !== ProjectStatus.COMPLETED
                );
            case 'Terminés':
                return allProjects.filter(
                    (project) => project.projectStatus === ProjectStatus.COMPLETED
                );
            case 'À vérifier':
                return allProjects.filter(
                    (project) =>
                        project.projectStatus === ProjectStatus.PLAN_GENERATED ||
                        project.projectStatus === ProjectStatus.PLAN_VALIDATED ||
                        project.projectStatus === ProjectStatus.PREVIEW_GENERATED
                );
            case 'Tous':
            default:
                return allProjects;
        }
    }
}