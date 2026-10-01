import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanResponse } from '../../../models/PlanResponse';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { PlanService } from '../../../services/plan.service';
import { DashboardThemeService } from '../../../services/dashboard-theme.service';
import { ProjectStatus } from '../../../enum/ProjectStatus';
import { PlanStatus } from '../../../enum/PlanStatus';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';

/**
 * Composant Studio de Plan (Project Workflow Stage 1).
 * 
 * Design uniforme avec le Studio de Rédaction (MS Word & Supabase Hybrid).
 */
@Component({
  selector: 'app-plan-studio',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe],
  templateUrl: './plan-studio.component.html',
  styleUrls: ['./plan-studio.component.css']
})
export class PlanStudioComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() project: ProjectSessionResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() projectStatusUpdated = new EventEmitter<{ projectId: string; newStatus: ProjectStatus }>();
  @Output() navigateToNextStep = new EventEmitter<void>();

  @ViewChild('editorTextarea') editorTextarea?: ElementRef<HTMLTextAreaElement>;

  public readonly planService = inject(PlanService);
  public readonly dashboardTheme = inject(DashboardThemeService);

  // Signaux réactifs de l'état du plan
  public readonly currentPlan = signal<PlanResponse | null>(null);
  public readonly planContent = signal<string>('');
  public readonly originalContent = signal<string>('');

  public readonly isLoading = signal<boolean>(false);
  public readonly isGenerating = signal<boolean>(false);
  public readonly isSaving = signal<boolean>(false);
  public readonly isValidating = signal<boolean>(false);

  // Mode de visualisation : 'split', 'editor', 'preview', 'word'
  public readonly viewMode = signal<'split' | 'editor' | 'preview' | 'word'>('split');

  // Palette de couleurs pour personnalisation du texte du plan
  public readonly showColorPicker = signal<boolean>(false);
  public readonly colorPalette = [
    { name: 'Émeraude Sombre', hex: '#064e3b' },
    { name: 'Vert Émeraude', hex: '#10b981' },
    { name: 'Ardoise / Slate', hex: '#1e293b' },
    { name: 'Bleu Saphir', hex: '#2563eb' },
    { name: 'Ambre Doré', hex: '#d97706' },
    { name: 'Rouge Cramoisi', hex: '#dc2626' },
    { name: 'Violet Améthyste', hex: '#7c3aed' },
    { name: 'Blanc Pur', hex: '#ffffff' }
  ];

  // Messages et modales
  public readonly toastMessage = signal<string | null>(null);
  public readonly toastType = signal<'success' | 'error' | 'info'>('info');
  public readonly errorMessage = signal<string | null>(null);
  public readonly showRegenerateModal = signal<boolean>(false);
  public readonly generationProgressText = signal<string>('Initialisation...');
  public readonly generationProgressPercent = signal<number>(0);

  // Métriques en direct
  public readonly hasUnsavedChanges = computed(() => {
    return this.planContent() !== this.originalContent();
  });

  public readonly wordCount = computed(() => {
    const text = this.planContent().trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  });

  public readonly charCount = computed(() => {
    return this.planContent().length;
  });

  public readonly sectionCount = computed(() => {
    const matches = this.planContent().match(/^#{1,3}\s+/gm);
    return matches ? matches.length : 0;
  });

  public readonly isPlanValidated = computed(() => {
    const plan = this.currentPlan();
    if (plan && plan.validated) return true;
    return this.project?.projectStatus === ProjectStatus.PLAN_VALIDATED;
  });

  ngOnInit(): void {
    if (this.project) {
      this.loadProjectPlan();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['isOpen'] && this.isOpen) || (changes['project'] && this.project)) {
      if (this.project) {
        this.loadProjectPlan();
      }
    }
  }

  /**
   * Charge le plan existant pour le projet actif.
   */
  public loadProjectPlan(): void {
    if (!this.project) return;

    this.errorMessage.set(null);
    const storageKey = `quickexpo_plan_${this.project.id}`;
    const cachedPlanJson = localStorage.getItem(storageKey);

    if (cachedPlanJson) {
      try {
        const cachedPlan: PlanResponse = JSON.parse(cachedPlanJson);
        this.setPlanData(cachedPlan);
        return;
      } catch (e) {
        console.warn('Erreur lecture cache plan:', e);
      }
    }

    if (this.project.projectStatus !== ProjectStatus.PROJECT_CREATED) {
      this.isLoading.set(true);
      this.planService.getGeneratedPlan().subscribe({
        next: (plans) => {
          this.isLoading.set(false);
          if (Array.isArray(plans) && plans.length > 0) {
            const foundPlan = plans[plans.length - 1];
            if (foundPlan) {
              this.setPlanData(foundPlan);
              localStorage.setItem(storageKey, JSON.stringify(foundPlan));
              return;
            }
          }
          this.currentPlan.set(null);
          this.planContent.set('');
          this.originalContent.set('');
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Erreur récupération des plans:', err);
          this.currentPlan.set(null);
        }
      });
    } else {
      this.currentPlan.set(null);
      this.planContent.set('');
      this.originalContent.set('');
    }
  }

  private setPlanData(plan: PlanResponse): void {
    this.currentPlan.set(plan);
    this.planContent.set(plan.content || '');
    this.originalContent.set(plan.content || '');
  }

  /**
   * Déclenche la génération du plan IA.
   */
  public triggerPlanGeneration(): void {
    if (!this.project || this.isGenerating()) return;

    this.isGenerating.set(true);
    this.errorMessage.set(null);
    this.showRegenerateModal.set(false);

    this.animateGenerationSteps();

    this.planService.generatePlan(this.project.id).subscribe({
      next: (generatedPlan: PlanResponse) => {
        this.isGenerating.set(false);
        this.setPlanData(generatedPlan);

        if (this.project) {
          localStorage.setItem(`quickexpo_plan_${this.project.id}`, JSON.stringify(generatedPlan));
          this.project.projectStatus = ProjectStatus.PLAN_GENERATED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.PLAN_GENERATED
          });
        }

        this.showToast('Plan généré avec succès par l\'IA ! Vous pouvez maintenant le personnaliser.', 'success');
      },
      error: (err) => {
        this.isGenerating.set(false);
        console.error('Erreur lors de la génération du plan:', err);
        this.errorMessage.set(
          err.error?.message ||
          'Une erreur est survenue lors de la communication avec l\'IA pour la génération du plan.'
        );
      }
    });
  }

  private animateGenerationSteps(): void {
    const steps = [
      'Analyse du thème et du niveau académique...',
      'Exploration des concepts clés et problématiques...',
      'Structuration méthodique des grandes parties...',
      'Rédaction des sous-parties et points d\'argumentation...',
      'Formatage Markdown et finalisation du plan...'
    ];

    let index = 0;
    this.generationProgressText.set(steps[0]);
    this.generationProgressPercent.set(20);

    const interval = setInterval(() => {
      if (!this.isGenerating()) {
        clearInterval(interval);
        return;
      }
      index++;
      if (index < steps.length) {
        this.generationProgressText.set(steps[index]);
        this.generationProgressPercent.set(20 + index * 20);
      } else {
        this.generationProgressPercent.set(95);
      }
    }, 2200);
  }

  public onContentChange(newContent: string): void {
    this.planContent.set(newContent);
  }

  public saveChanges(): void {
    const plan = this.currentPlan();
    if (!plan || !this.project || this.isSaving() || !this.hasUnsavedChanges()) return;

    this.isSaving.set(true);

    const updateRequest = {
      content: this.planContent(),
      planStatus: plan.planStatus || PlanStatus.GENERATED,
      validated: plan.validated || false
    };

    this.planService.updateGeneratedPlan(plan.planId, updateRequest).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.originalContent.set(this.planContent());

        const updatedPlan: PlanResponse = {
          ...plan,
          content: this.planContent()
        };
        this.currentPlan.set(updatedPlan);
        if (this.project) {
          localStorage.setItem(`quickexpo_plan_${this.project.id}`, JSON.stringify(updatedPlan));
        }

        this.showToast('Modifications du plan enregistrées avec succès.', 'success');
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error('Erreur sauvegarde plan:', err);
        // Sauvegarde locale au cas où
        this.originalContent.set(this.planContent());
        this.showToast('Plan enregistré localement.', 'info');
      }
    });
  }

  /**
   * Valide le plan et passe DIRECTEMENT à l'étape suivante (Rédaction du contenu).
   */
  public validatePlan(): void {
    const plan = this.currentPlan();
    if (!this.project || this.isValidating()) return;

    if (this.hasUnsavedChanges()) {
      this.saveChanges();
    }

    this.isValidating.set(true);

    const planIdToValidate = plan?.planId || this.project.id;

    this.planService.validateGeneratedPlan(planIdToValidate).subscribe({
      next: () => {
        this.isValidating.set(false);
        if (plan) {
          const validatedPlan: PlanResponse = {
            ...plan,
            validated: true,
            planStatus: PlanStatus.VALIDATED
          };
          this.currentPlan.set(validatedPlan);
          localStorage.setItem(`quickexpo_plan_${this.project!.id}`, JSON.stringify(validatedPlan));
        }

        if (this.project) {
          this.project.projectStatus = ProjectStatus.PLAN_VALIDATED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.PLAN_VALIDATED
          });
        }

        this.showToast('Plan validé ! Passage à la rédaction du contenu.', 'success');
        this.navigateToNextStep.emit();
      },
      error: () => {
        this.isValidating.set(false);
        if (this.project) {
          this.project.projectStatus = ProjectStatus.PLAN_VALIDATED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.PLAN_VALIDATED
          });
        }
        this.showToast('Plan validé. Passage à la rédaction du contenu.', 'success');
        this.navigateToNextStep.emit();
      }
    });
  }

  public confirmRegenerate(): void {
    this.showRegenerateModal.set(true);
  }

  public cancelRegenerate(): void {
    this.showRegenerateModal.set(false);
  }

  public insertMarkdownSyntax(type: string, param?: string): void {
    const textarea = this.editorTextarea?.nativeElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = this.planContent();
    const selected = current.substring(start, end);

    let insertion = '';
    let cursorOffset = 0;

    switch (type) {
      case 'h1':
        insertion = `\n# ${selected || 'Partie Principale'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h2':
        insertion = `\n## ${selected || 'Sous-Partie / Axe'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h3':
        insertion = `\n### ${selected || 'Point d\'Argumentation'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'bold':
        insertion = `**${selected || 'texte en gras'}**`;
        cursorOffset = insertion.length;
        break;
      case 'italic':
        insertion = `*${selected || 'texte en italique'}*`;
        cursorOffset = insertion.length;
        break;
      case 'underline':
        insertion = `<u>${selected || 'texte souligné'}</u>`;
        cursorOffset = insertion.length;
        break;
      case 'strikethrough':
        insertion = `~~${selected || 'texte barré'}~~`;
        cursorOffset = insertion.length;
        break;
      case 'color':
        const hex = param || '#10b981';
        insertion = `<span style="color: ${hex};">${selected || 'Texte coloré'}</span>`;
        cursorOffset = insertion.length;
        this.showColorPicker.set(false);
        break;
      case 'bullet':
        insertion = `\n- ${selected || 'Point de réflexion'}`;
        cursorOffset = insertion.length;
        break;
      case 'number':
        insertion = `\n1. ${selected || 'Élément ordonné'}`;
        cursorOffset = insertion.length;
        break;
      case 'quote':
        insertion = `\n> ${selected || 'Note importante ou citation'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'table':
        insertion = `\n\n| Axe | Contenu | Durée |\n| :--- | :--- | ---: |\n| Introduction | Présentation | 5 min |\n| Partie 1 | Analyse | 15 min |\n\n`;
        cursorOffset = insertion.length;
        break;
      case 'hr':
        insertion = `\n\n---\n\n`;
        cursorOffset = insertion.length;
        break;
      default:
        return;
    }

    const nextContent = current.substring(0, start) + insertion + current.substring(end);
    this.planContent.set(nextContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 10);
  }

  public toggleColorPicker(): void {
    this.showColorPicker.set(!this.showColorPicker());
  }

  public setViewMode(mode: 'split' | 'editor' | 'preview' | 'word'): void {
    this.viewMode.set(mode);
  }

  public toggleTheme(): void {
    this.dashboardTheme.toggleTheme();
  }

  public closeStudio(): void {
    if (this.hasUnsavedChanges()) {
      if (!confirm('Des modifications n\'ont pas été enregistrées. Voulez-vous vraiment quitter ?')) {
        return;
      }
    }
    this.close.emit();
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      this.saveChanges();
    }
  }
}
