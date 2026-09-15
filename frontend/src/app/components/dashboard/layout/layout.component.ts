import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectCardComponent, ProjectCardItem } from '../project-card/project-card.component';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { SearchProjectComponent } from '../search-project/search-project.component';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, SearchProjectComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class DashboardLayoutComponent {
  @Input() projects: ProjectSessionResponse[] = [];
  @Input() filters: string[] = [];
  @Input() activeFilter = 'Tous';
  @Input() viewMode: 'grid' | 'list' = 'grid';

  isSearchOpen = false;

  @Output() filterChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();

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
}
