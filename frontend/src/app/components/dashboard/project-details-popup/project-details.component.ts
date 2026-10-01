import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { ProjectSessionService } from '../../../services/project-session.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  @Input() isOpen = false;
  @Input() project: ProjectSessionResponse | null = null;

  @Output() close = new EventEmitter<void>();

  private projectSessionService = inject(ProjectSessionService);
  private router = inject(Router);

  closeModal(): void {
    this.close.emit();
  }

  openStudio(): void {
    if (this.project?.id) {
      this.closeModal();
      this.router.navigate(['/studio', this.project.id]);
    }
  }


  deleteProject(): void {
    if (!this.project?.id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectSessionService.deleteProjectSessionById(this.project.id).subscribe({
        next: () => {
          console.log('Projet supprimé avec succès');
          this.close.emit();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du projet:', err);
        }
      });
    }
  }

  get initials(): string {
    const value = this.project?.theme?.trim();
    if (!value) return 'Q';

    const words = value.split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
}
