import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
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
import { ProjectStatus } from '../../../enum/ProjectStatus';
import { PlanStatus } from '../../../enum/PlanStatus';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';

/**
 * Composant Studio de Plan (Project Workflow Panel).
 * 
 * Inspiré de l'expérience utilisateur épurée de Gamma.app et du design system sombre de Supabase.
 * Permet de :
 * 1. Visualiser le fil d'Ariane du workflow global (Session -> Plan -> Contenu -> Document -> Téléchargement).
 * 2. Vérifier si un plan a déjà été généré pour le projet sélectionné.
 * 3. Générer le plan assisté par IA avec animations de progression.
 * 4. Éditer en direct le plan en Markdown (avec barre d'outils et prévisualisation live réactive).
 * 5. Sauvegarder les modifications et valider le plan.
 * 6. Guider vers l'étape suivante (Génération du document).
 */
@Component({
  selector: 'app-plan-studio',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe],
  templateUrl: './plan-studio.component.html',
  styleUrls: ['./plan-studio.component.css']
})
export class PlanStudioComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() project: ProjectSessionResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() projectStatusUpdated = new EventEmitter<{ projectId: string; newStatus: ProjectStatus }>();

  @ViewChild('editorTextarea') editorTextarea?: ElementRef<HTMLTextAreaElement>;

  public readonly planService = inject(PlanService);

  // État réactif du composant via Angular Signals
  public readonly currentPlan = signal<PlanResponse | null>(null);
  public readonly planContent = signal<string>('');
  public readonly originalContent = signal<string>('');

  public readonly isLoading = signal<boolean>(false);
  public readonly isGenerating = signal<boolean>(false);
  public readonly isSaving = signal<boolean>(false);
  public readonly isValidating = signal<boolean>(false);

  // Mode de visualisation : 'split' (double vue), 'editor' (éditeur seul), 'preview' (aperçu seul)
  public readonly viewMode = signal<'split' | 'editor' | 'preview'>('split');

  // Messages et notifications
  public readonly toastMessage = signal<string | null>(null);
  public readonly toastType = signal<'success' | 'error' | 'info'>('info');
  public readonly errorMessage = signal<string | null>(null);
  public readonly showRegenerateModal = signal<boolean>(false);
  public readonly showNextStepModal = signal<boolean>(false);
  public readonly generationProgressText = signal<string>('Initialisation...');

  // Métriques en direct calculées via computed
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

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['isOpen'] && this.isOpen) || (changes['project'] && this.project)) {
      if (this.isOpen && this.project) {
        this.loadProjectPlan();
      }
    }
  }

  /**
   * Charge le plan existant pour le projet actif.
   * Vérifie d'abord le cache local, puis l'API.
   */
  public loadProjectPlan(): void {
    if (!this.project) return;

    this.errorMessage.set(null);
    const storageKey = `quickexpo_plan_${this.project.id}`;
    const cachedPlanJson = localStorage.getItem(storageKey);

    // Si on a un cache local récent pour ce projet
    if (cachedPlanJson) {
      try {
        const cachedPlan: PlanResponse = JSON.parse(cachedPlanJson);
        this.setPlanData(cachedPlan);
        return;
      } catch (e) {
        console.warn('Erreur lecture cache plan:', e);
      }
    }

    // Si le projet a déjà le statut PLAN_GENERATED ou PLAN_VALIDATED, on va chercher via l'API
    if (
      this.project.projectStatus !== ProjectStatus.PROJECT_CREATED
    ) {
      this.isLoading.set(true);
      this.planService.getGeneratedPlan().subscribe({
        next: (plans) => {
          this.isLoading.set(false);
          if (Array.isArray(plans) && plans.length > 0) {
            // Si on a plusieurs plans, on peut prendre le dernier ou le plus récent
            const foundPlan = plans[plans.length - 1];
            if (foundPlan) {
              this.setPlanData(foundPlan);
              localStorage.setItem(storageKey, JSON.stringify(foundPlan));
              return;
            }
          }
          // Aucun plan trouvé sur le serveur malgré le statut
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
      // Le projet vient d'être créé, pas encore de plan
      this.currentPlan.set(null);
      this.planContent.set('');
      this.originalContent.set('');
    }
  }

  /**
   * Assigne les données d'un plan chargé dans les signaux du composant.
   */
  private setPlanData(plan: PlanResponse): void {
    this.currentPlan.set(plan);
    this.planContent.set(plan.content || '');
    this.originalContent.set(plan.content || '');
  }

  /**
   * Déclenche la génération du plan par l'IA via le PlanService.
   */
  public triggerPlanGeneration(): void {
    if (!this.project || this.isGenerating()) return;

    this.isGenerating.set(true);
    this.errorMessage.set(null);
    this.showRegenerateModal.set(false);

    // Messages progressifs pour une expérience utilisateur interactive façon Gamma
    this.animateGenerationSteps();

    this.planService.generatePlan(this.project.id).subscribe({
      next: (generatedPlan: PlanResponse) => {
        this.isGenerating.set(false);
        this.setPlanData(generatedPlan);

        // Sauvegarder dans le cache local
        if (this.project) {
          localStorage.setItem(`quickexpo_plan_${this.project.id}`, JSON.stringify(generatedPlan));
          
          // Mise à jour du statut du projet vers PLAN_GENERATED
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
          'Une erreur est survenue lors de la communication avec l\'IA. Veuillez réessayer dans un instant.'
        );
      }
    });
  }

  /**
   * Anime des messages descriptifs pendant l'attente de la génération IA.
   */
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

    const interval = setInterval(() => {
      if (!this.isGenerating()) {
        clearInterval(interval);
        return;
      }
      index = (index + 1) % steps.length;
      this.generationProgressText.set(steps[index]);
    }, 2800);
  }

  /**
   * Met à jour le contenu lors de la saisie utilisateur dans l'éditeur.
   */
  public onContentChange(newContent: string): void {
    this.planContent.set(newContent);
  }

  /**
   * Sauvegarde les modifications du plan via l'API updateGeneratedPlan.
   */
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

        // Mettre à jour l'objet plan local et le cache
        const updatedPlan: PlanResponse = {
          ...plan,
          content: this.planContent()
        };
        this.currentPlan.set(updatedPlan);
        if (this.project) {
          localStorage.setItem(`quickexpo_plan_${this.project.id}`, JSON.stringify(updatedPlan));
        }

        this.showToast('Modifications enregistrées avec succès.', 'success');
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error('Erreur lors de la sauvegarde du plan:', err);
        this.showToast('Erreur lors de l\'enregistrement des modifications.', 'error');
      }
    });
  }

  /**
   * Valide définitivement le plan d'exposé via l'API validateGeneratedPlan.
   */
  public validatePlan(): void {
    const plan = this.currentPlan();
    if (!plan || !this.project || this.isValidating()) return;

    // Si des modifications non enregistrées existent, on sauvegarde d'abord
    if (this.hasUnsavedChanges()) {
      this.saveChanges();
    }

    this.isValidating.set(true);

    this.planService.validateGeneratedPlan(plan.planId).subscribe({
      next: () => {
        this.isValidating.set(false);

        // Mettre à jour l'état du plan
        const validatedPlan: PlanResponse = {
          ...plan,
          validated: true,
          planStatus: PlanStatus.VALIDATED
        };
        this.currentPlan.set(validatedPlan);

        if (this.project) {
          localStorage.setItem(`quickexpo_plan_${this.project.id}`, JSON.stringify(validatedPlan));
          this.project.projectStatus = ProjectStatus.PLAN_VALIDATED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.PLAN_VALIDATED
          });
        }

        this.showToast('Félicitations ! Votre plan est validé. Vous pouvez passer à l\'étape suivante.', 'success');
      },
      error: (err) => {
        this.isValidating.set(false);
        console.error('Erreur lors de la validation du plan:', err);
        this.showToast('Erreur lors de la validation du plan.', 'error');
      }
    });
  }

  /**
   * Ouvre la modale de confirmation pour régénérer le plan.
   */
  public confirmRegenerate(): void {
    this.showRegenerateModal.set(true);
  }

  public cancelRegenerate(): void {
    this.showRegenerateModal.set(false);
  }

  /**
   * Insère des éléments syntaxiques Markdown à la position du curseur dans le textarea.
   */
  public insertMarkdownSyntax(type: string): void {
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
        insertion = `\n# ${selected || 'Titre principal'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h2':
        insertion = `\n## ${selected || 'Partie ou Axe'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h3':
        insertion = `\n### ${selected || 'Sous-partie'}\n`;
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
      case 'bullet':
        insertion = `\n- ${selected || 'Élément de liste'}`;
        cursorOffset = insertion.length;
        break;
      case 'number':
        insertion = `\n1. ${selected || 'Élément ordonné'}`;
        cursorOffset = insertion.length;
        break;
      case 'quote':
        insertion = `\n> ${selected || 'Citation ou remarque importante'}\n`;
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

    // Repositionner le curseur
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 10);
  }

  /**
   * Change le mode d'affichage de l'interface (Split, Éditeur, Aperçu).
   */
  public setViewMode(mode: 'split' | 'editor' | 'preview'): void {
    this.viewMode.set(mode);
  }

  /**
   * Affiche la modale d'information pour la prochaine étape du workflow.
   */
  public openNextStepWorkflow(): void {
    this.showNextStepModal.set(true);
  }

  public closeNextStepWorkflow(): void {
    this.showNextStepModal.set(false);
  }

  /**
   * Ferme le studio et revient au tableau de bord.
   */
  public closeStudio(): void {
    if (this.hasUnsavedChanges()) {
      if (!confirm('Des modifications n\'ont pas été enregistrées. Voulez-vous vraiment quitter ?')) {
        return;
      }
    }
    this.close.emit();
  }

  /**
   * Affiche un message toast temporaire.
   */
  private showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  @HostListener('document:keydown.escape')
  public onEscapeKey(): void {
    if (this.isOpen) {
      if (this.showRegenerateModal()) {
        this.showRegenerateModal.set(false);
      } else if (this.showNextStepModal()) {
        this.showNextStepModal.set(false);
      } else {
        this.closeStudio();
      }
    }
  }
}
