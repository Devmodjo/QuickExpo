import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSessionService } from '../../../services/project-session.service';
import { PlanService } from '../../../services/plan.service';
import { DashboardThemeService } from '../../../services/dashboard-theme.service';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { PlanResponse } from '../../../models/PlanResponse';
import { ProjectStatus } from '../../../enum/ProjectStatus';
import { PlanStudioComponent } from '../plan-studio/plan-studio.component';
import { ContentStudioComponent } from '../content-studio/content-studio.component';

export type StudioTab = 'plan' | 'content' | 'export';

@Component({
  selector: 'app-studio-page',
  standalone: true,
  imports: [CommonModule, PlanStudioComponent, ContentStudioComponent],
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectSessionService = inject(ProjectSessionService);
  private planService = inject(PlanService);
  public dashboardTheme = inject(DashboardThemeService);

  public projectId = signal<string | null>(null);
  public project = signal<ProjectSessionResponse | null>(null);
  public currentPlan = signal<PlanResponse | null>(null);
  public activeTab = signal<StudioTab>('plan');

  public isLoading = signal<boolean>(true);
  public errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      const tabParam = params.get('tab') as StudioTab | null;

      if (id) {
        this.projectId.set(id);
        if (tabParam && ['plan', 'content', 'export'].includes(tabParam)) {
          this.activeTab.set(tabParam);
        }
        this.loadProjectDetails(id);
      } else {
        this.isLoading.set(false);
        this.errorMessage.set('Aucun identifiant de projet n\'a été fourni.');
      }
    });
  }

  /**
   * Charge les données du projet et son plan associé.
   */
  public loadProjectDetails(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.projectSessionService.getProjectSessionById(id).subscribe({
      next: (proj) => {
        this.project.set(proj);
        this.loadPlanForProject(id, proj);
      },
      error: (err) => {
        // En cas de non réponse ou erreur 404, tenter de chercher dans la liste globale
        this.projectSessionService.getProjectSession().subscribe({
          next: (projects) => {
            const found = projects.find((p) => p.id === id);
            if (found) {
              this.project.set(found);
              this.loadPlanForProject(id, found);
            } else {
              this.isLoading.set(false);
              this.errorMessage.set('Impossible de trouver la session de projet demandée.');
            }
          },
          error: () => {
            this.isLoading.set(false);
            this.errorMessage.set('Erreur lors du chargement des détails du projet.');
          }
        });
      }
    });
  }

  private loadPlanForProject(id: string, proj: ProjectSessionResponse): void {
    const storageKey = `quickexpo_plan_${id}`;
    const cached = localStorage.getItem(storageKey);

    if (cached) {
      try {
        const parsedPlan: PlanResponse = JSON.parse(cached);
        this.currentPlan.set(parsedPlan);
      } catch (e) {
        console.warn('Erreur lecture plan cache local:', e);
        this.currentPlan.set(null);
      }
    } else {
      this.currentPlan.set(null);
    }

    if (proj.projectStatus !== ProjectStatus.PROJECT_CREATED) {
      this.planService.getGeneratedPlan().subscribe({
        next: (plans) => {
          this.isLoading.set(false);
          if (Array.isArray(plans) && plans.length > 0) {
            const matchingPlan = plans.find((p) => p.planId === id || (p as any).projectId === id);
            if (matchingPlan) {
              this.currentPlan.set(matchingPlan);
              localStorage.setItem(storageKey, JSON.stringify(matchingPlan));
            }
          }

          if (!this.route.snapshot.paramMap.get('tab')) {
            if (
              proj.projectStatus === ProjectStatus.PLAN_VALIDATED ||
              proj.projectStatus === ProjectStatus.PREVIEW_GENERATED ||
              proj.projectStatus === ProjectStatus.COMPLETED
            ) {
              this.activeTab.set('content');
            }
          }
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(false);
    }
  }

  public setTab(tab: StudioTab): void {
    this.activeTab.set(tab);
    if (this.projectId()) {
      this.router.navigate(['/studio', this.projectId(), tab], { replaceUrl: true });
    }
  }

  public onProjectStatusUpdated(update: { projectId: string; newStatus: ProjectStatus }): void {
    const p = this.project();
    if (p && p.id === update.projectId) {
      p.projectStatus = update.newStatus;
      this.project.set({ ...p });
    }
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public toggleTheme(): void {
    this.dashboardTheme.toggleTheme();
  }

  /**
   * Action d'exportation / téléchargement direct du document final.
   */
  public downloadDocument(format: 'markdown' | 'txt' | 'html'): void {
    const proj = this.project();
    if (!proj) return;

    const storageKey = `quickexpo_content_${proj.id}`;
    const cachedContent = localStorage.getItem(storageKey);
    let contentText = '';

    if (cachedContent) {
      try {
        const dto = JSON.parse(cachedContent);
        contentText = dto.markdownContent || '';
      } catch (e) {
        console.warn('Erreur lecture contenu:', e);
      }
    }

    if (!contentText && this.currentPlan()) {
      contentText = this.currentPlan()?.content || '';
    }

    if (!contentText) {
      alert('Aucun contenu rédigé n\'est disponible pour l\'exportation.');
      return;
    }

    let mimeType = 'text/markdown';
    let fileExtension = 'md';

    if (format === 'txt') {
      mimeType = 'text/plain';
      fileExtension = 'txt';
    } else if (format === 'html') {
      mimeType = 'text/html';
      fileExtension = 'html';
    }

    const filename = `${proj.theme || 'Expose_QuickExpo'}.${fileExtension}`;
    const blob = new Blob([contentText], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
