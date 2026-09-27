import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, ElementRef, HostListener, inject } from '@angular/core';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: ProjectSessionResponse;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  @Output() selectProject = new EventEmitter<ProjectSessionResponse>();
  @Output() viewDetails = new EventEmitter<ProjectSessionResponse>();
  @Output() editProject = new EventEmitter<ProjectSessionResponse>();
  @Output() deleteProject = new EventEmitter<string>();

  private elementRef = inject(ElementRef);

  imageFailed = false;
  isMenuOpen = signal(false);

  get initials(): string {
    const value = this.project?.theme?.trim();
    if (!value) return 'QE';

    const words = value.split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  /**
   * Retourne le libellé en français du statut actuel du workflow pour ce projet.
   */
  get statusLabel(): string {
    switch (this.project?.projectStatus) {
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

  /**
   * Retourne la classe CSS correspondante au statut pour le styling Supabase.
   */
  get statusClass(): string {
    switch (this.project?.projectStatus) {
      case 'PLAN_VALIDATED':
        return 'status-validated';
      case 'PLAN_GENERATED':
        return 'status-generated';
      case 'PREVIEW_GENERATED':
        return 'status-content';
      case 'COMPLETED':
        return 'status-completed';
      case 'GENERATING':
        return 'status-generating';
      case 'PROJECT_CREATED':
      default:
        return 'status-pending';
    }
  }

  onImageError(): void {
    this.imageFailed = true;
  }

  onCardClick(): void {
    this.selectProject.emit(this.project);
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  onViewDetails(event: Event): void {
    event.stopPropagation();
    this.closeMenu();
    this.viewDetails.emit(this.project);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.closeMenu();
    this.editProject.emit(this.project);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.closeMenu();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.deleteProject.emit(this.project.id);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}

