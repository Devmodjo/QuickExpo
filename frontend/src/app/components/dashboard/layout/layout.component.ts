import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { SearchProjectComponent } from '../search-project/search-project.component';
import { CreateProjectComponent } from '../create-project-popup/create-project.component';
import { ProjectDetailsComponent } from '../project-details-popup/project-details.component';
import { PlanStudioComponent } from '../plan-studio/plan-studio.component';
import { ProjectSessionService } from '../../../services/project-session.service';
import { ProjectStatus } from '../../../enum/ProjectStatus';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    SearchProjectComponent,
    CreateProjectComponent,
    ProjectDetailsComponent,
    PlanStudioComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class DashboardLayoutComponent {
  @Input() projects: ProjectSessionResponse[] = [];
  @Input() filters: string[] = [];
  @Input() activeFilter = 'Tous';
  @Input() viewMode: 'grid' | 'list' = 'grid';

  isSearchOpen = false;
  isCreateModalOpen = signal(false);
  isDetailsModalOpen = signal(false);
  selectedProject = signal<ProjectSessionResponse | null>(null);

  // Signaux pour le Studio de Plan (Panneau workflow façon Gamma)
  isPlanStudioOpen = signal(false);
  activeWorkflowProject = signal<ProjectSessionResponse | null>(null);
  
  private projectSessionService = inject(ProjectSessionService);

  @Output() filterChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
  @Output() projectsUpdated = new EventEmitter<void>();

  /**
   * Ouvre le studio de génération et d'édition du plan pour le projet donné.
   * Fonctionne depuis un clic sur la project card ou depuis la recherche.
   */
  openPlanStudio(project: ProjectSessionResponse): void {
    this.closeSearch();
    this.activeWorkflowProject.set(project);
    this.isPlanStudioOpen.set(true);
  }

  /**
   * Ferme le studio de plan et réinitialise le projet sélectionné.
   */
  closePlanStudio(): void {
    this.isPlanStudioOpen.set(false);
    this.activeWorkflowProject.set(null);
  }

  /**
   * Met à jour le statut du projet après génération ou validation du plan.
   */
  onProjectStatusUpdated(update: { projectId: string; newStatus: ProjectStatus }): void {
    const proj = this.projects.find((p) => p.id === update.projectId);
    if (proj) {
      proj.projectStatus = update.newStatus;
    }
    this.projectsUpdated.emit();
  }

  onFilterClick(filter: string): void {
    this.filterChange.emit(filter);
  }

  onViewModeChange(mode: 'grid' | 'list'): void {
    this.viewModeChange.emit(mode);
  }

  openSearch(): void {
    this.isSearchOpen = true;
  }

  closeSearch(): void {
    this.isSearchOpen = false;
  }

  openCreateModal(): void {
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  onViewDetails(project: ProjectSessionResponse): void {
    this.selectedProject.set(project);
    this.isDetailsModalOpen.set(true);
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen.set(false);
    this.selectedProject.set(null);
  }

  onDeleteProject(projectId: string): void {
    this.projectSessionService.deleteProjectSessionById(projectId).subscribe({
      next: () => {
        console.log('Projet supprimé avec succès');
        this.projectsUpdated.emit();
        this.closeDetailsModal();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du projet:', err);
      }
    });
  }
}
