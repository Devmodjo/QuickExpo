import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';

export interface ProjectCardItem {
  id?: string;
  title: string;
  subtitle: string;
  image?: string;
  accent?: 'light' | 'dark' | 'neutral';
}

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

  imageFailed = false;

  get initials(): string {
    const value = this.project?.theme?.trim();
    if (!value) return 'Q';

    const words = value.split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  onImageError(): void {
    this.imageFailed = true;
  }
}
