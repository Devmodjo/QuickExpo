import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { ProjectSessionService } from '../../../services/project-session.service';

@Component({
  selector: 'app-search-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() selectProject = new EventEmitter<ProjectSessionResponse>();

  private readonly projectSession = inject(ProjectSessionService);

  readonly searchTerm = signal('');
  readonly projects = signal<ProjectSessionResponse[]>([]);
  readonly isLoading = signal(false);
  readonly isClosing = signal(false);

  /**
   * Sélectionne un projet, ferme la modal et émet l'événement pour ouvrir le studio de plan.
   */
  onSelectProject(project: ProjectSessionResponse): void {
    this.closeModal();
    this.selectProject.emit(project);
  }

  /**
   * Retourne le libellé du statut de workflow pour l'élément recherché.
   */
  getStatusLabel(project: ProjectSessionResponse): string {
    switch (project.projectStatus) {
      case 'PLAN_VALIDATED':
        return 'Plan validé';
      case 'PLAN_GENERATED':
        return 'Plan généré';
      case 'PREVIEW_GENERATED':
        return 'Contenu prêt';
      case 'COMPLETED':
        return 'Terminé';
      case 'GENERATING':
        return 'Génération...';
      case 'PROJECT_CREATED':
      default:
        return 'Plan à générer';
    }
  }

  getStatusClass(project: ProjectSessionResponse): string {
    switch (project.projectStatus) {
      case 'PLAN_VALIDATED':
        return 'status-validated';
      case 'PLAN_GENERATED':
        return 'status-generated';
      case 'PREVIEW_GENERATED':
        return 'status-content';
      case 'COMPLETED':
        return 'status-completed';
      case 'PROJECT_CREATED':
      default:
        return 'status-pending';
    }
  }

  readonly filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = this.projects();

    if (!term) {
      return source;
    }

    return source.filter((project) => {
      const searchable = [
        project.subject,
        project.theme,
        project.language,
        project.academicLevel,
        project.description ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(term);
    });
  });

  ngOnInit(): void {
    this.isLoading.set(true);

    this.projectSession.getProjectSession().subscribe({
      next: (projects) => {
        this.projects.set(Array.isArray(projects) ? projects : []);
        this.isLoading.set(false);
      },
      error: () => {
        this.projects.set([]);
        this.isLoading.set(false);
      }
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchTerm.set(target?.value ?? '');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen && !this.isClosing()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    if (this.isClosing()) {
      return;
    }

    this.isClosing.set(true);
    window.setTimeout(() => {
      this.close.emit();
    }, 200);
  }

  getShortLabel(project: ProjectSessionResponse): string {
    const base = project.subject?.trim() || project.theme?.trim() || 'Projet';
    return base.slice(0, 2).toUpperCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) {
      return 'Date inconnue';
    }

    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
