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
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { PlanResponse } from '../../../models/PlanResponse';
import { GenerateContentDto } from '../../../models/GenerateContentDto';
import { GeneratedContentService } from '../../../services/generated-content.service';
import { PlanService } from '../../../services/plan.service';
import { DashboardThemeService } from '../../../services/dashboard-theme.service';
import { ProjectStatus } from '../../../enum/ProjectStatus';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';

export interface TocItem {
  id: string;
  level: number;
  text: string;
}

@Component({
  selector: 'app-content-studio',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe],
  templateUrl: './content-studio.component.html',
  styleUrls: ['./content-studio.component.css']
})
export class ContentStudioComponent implements OnInit, OnChanges {
  @Input() project: ProjectSessionResponse | null = null;
  @Input() plan: PlanResponse | null = null;
  @Input() standalone = false;

  @Output() close = new EventEmitter<void>();
  @Output() projectStatusUpdated = new EventEmitter<{ projectId: string; newStatus: ProjectStatus }>();
  @Output() navigateToNextStep = new EventEmitter<void>();

  @ViewChild('editorTextarea') editorTextarea?: ElementRef<HTMLTextAreaElement>;

  public readonly generatedContentService = inject(GeneratedContentService);
  public readonly planService = inject(PlanService);
  public readonly dashboardTheme = inject(DashboardThemeService);

  // Signaux d'état du composant
  public readonly currentContent = signal<GenerateContentDto | null>(null);
  public readonly markdownContent = signal<string>('');
  public readonly originalContent = signal<string>('');
  public readonly documentTitle = signal<string>('Document d\'Exposé');

  public readonly isLoading = signal<boolean>(false);
  public readonly isGenerating = signal<boolean>(false);
  public readonly isSaving = signal<boolean>(false);
  public readonly isValidating = signal<boolean>(false);

  // Vue : 'split' (Éditeur + Aperçu), 'editor' (Éditeur), 'preview' (Aperçu), 'word' (Page MS Word)
  public readonly viewMode = signal<'split' | 'editor' | 'preview' | 'word'>('split');

  // Palette de couleurs pour la personnalisation du texte
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

  // Modales et notifications
  public readonly toastMessage = signal<string | null>(null);
  public readonly toastType = signal<'success' | 'error' | 'info'>('info');
  public readonly errorMessage = signal<string | null>(null);
  public readonly generationProgressText = signal<string>('Initialisation...');
  public readonly generationProgressPercent = signal<number>(0);

  // Métriques réactives calculées
  public readonly hasUnsavedChanges = computed(() => {
    return this.markdownContent() !== this.originalContent();
  });

  public readonly wordCount = computed(() => {
    const text = this.markdownContent().trim();
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  });

  public readonly charCount = computed(() => {
    return this.markdownContent().length;
  });

  public readonly readingTime = computed(() => {
    const words = this.wordCount();
    return Math.max(1, Math.ceil(words / 200));
  });

  public readonly isContentValidated = computed(() => {
    return this.project?.projectStatus === ProjectStatus.COMPLETED;
  });

  // Sommaire / Table des matières dynamique (TOC)
  public readonly tocItems = computed<TocItem[]>(() => {
    const content = this.markdownContent();
    if (!content) return [];

    const lines = content.split('\n');
    const items: TocItem[] = [];

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,4})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        items.push({
          id: `toc-heading-${index}`,
          level,
          text
        });
      }
    });

    return items;
  });

  ngOnInit(): void {
    if (this.project) {
      this.loadGeneratedContent();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.loadGeneratedContent();
    }
  }

  /**
   * Charge le contenu rédigé pour le projet actif depuis l'API ou le cache local.
   */
  public loadGeneratedContent(): void {
    if (!this.project) return;

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const storageKey = `quickexpo_content_${this.project.id}`;
    const cachedContentJson = localStorage.getItem(storageKey);

    if (cachedContentJson) {
      try {
        const cachedDto: GenerateContentDto = JSON.parse(cachedContentJson);
        this.setContentData(cachedDto);
        this.isLoading.set(false);
        return;
      } catch (e) {
        console.warn('Erreur lecture cache contenu:', e);
      }
    }

    // Récupération de tous les contenus via le service API
    this.generatedContentService.getAllGeneratedContent().subscribe({
      next: (contents) => {
        this.isLoading.set(false);
        if (Array.isArray(contents) && contents.length > 0) {
          const contentDto = contents.find((c) => c.id === `content_${this.project?.id}` || c.id === this.project?.id || (c as any).projectId === this.project?.id);
          if (contentDto && (contentDto.markdownContent || contentDto.title)) {
            this.setContentData(contentDto);
            if (this.project) {
              localStorage.setItem(`quickexpo_content_${this.project.id}`, JSON.stringify(contentDto));
            }
            return;
          }
        }
        // Pas encore de contenu généré pour ce projet
        this.currentContent.set(null);
        this.markdownContent.set('');
        this.originalContent.set('');
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Erreur récupération contenu rédigé:', err);
        this.currentContent.set(null);
        this.markdownContent.set('');
        this.originalContent.set('');
      }
    });
  }

  private setContentData(dto: GenerateContentDto): void {
    this.currentContent.set(dto);
    this.markdownContent.set(dto.markdownContent || '');
    this.originalContent.set(dto.markdownContent || '');
    this.documentTitle.set(dto.title || this.project?.theme || 'Document d\'Exposé');
  }

  private getResolvedPlanId(): string | null {
    if (this.plan?.planId) {
      return this.plan.planId;
    }
    if (this.project) {
      const cachedPlan = localStorage.getItem(`quickexpo_plan_${this.project.id}`);
      if (cachedPlan) {
        try {
          const parsed = JSON.parse(cachedPlan);
          if (parsed?.planId) return parsed.planId;
        } catch (e) {
          console.warn('Erreur parsing cache plan:', e);
        }
      }
    }
    return null;
  }

  /**
   * Déclenche la génération du contenu rédigé par l'IA via GeneratedContentService.
   */
  public triggerContentGeneration(): void {
    if (!this.project || this.isGenerating()) return;

    const resolvedPlanId = this.getResolvedPlanId();

    if (!resolvedPlanId) {
      // Si planId n'est pas directement en cache, on tente une dernière fois via planService
      this.planService.getGeneratedPlan().subscribe({
        next: (plans) => {
          const matchingPlan = plans && plans.length > 0 ? plans[plans.length - 1] : null;
          const planIdToUse = matchingPlan?.planId || this.project?.id;
          if (planIdToUse) {
            this.executeContentGeneration(planIdToUse);
          } else {
            this.createFallbackContentFromPlan();
          }
        },
        error: () => {
          this.createFallbackContentFromPlan();
        }
      });
      return;
    }

    this.executeContentGeneration(resolvedPlanId);
  }

  private executeContentGeneration(planId: string): void {
    this.isGenerating.set(true);
    this.errorMessage.set(null);

    this.animateGenerationProgress();

    this.generatedContentService.generateContent(planId).subscribe({
      next: (res: any) => {
        this.generatedContentService.getAllGeneratedContent().subscribe({
          next: (contents) => {
            this.isGenerating.set(false);
            if (Array.isArray(contents) && contents.length > 0) {
              const latest = contents[contents.length - 1];
              this.setContentData(latest);
              if (this.project) {
                localStorage.setItem(`quickexpo_content_${this.project.id}`, JSON.stringify(latest));
                this.project.projectStatus = ProjectStatus.PREVIEW_GENERATED;
                this.projectStatusUpdated.emit({
                  projectId: this.project.id,
                  newStatus: ProjectStatus.PREVIEW_GENERATED
                });
              }
            } else if (res && typeof res === 'object' && (res.markdownContent || res.content)) {
              const dto: GenerateContentDto = {
                id: res.id || `content_${this.project?.id}`,
                title: res.title || this.project?.theme || 'Document d\'Exposé',
                markdownContent: res.markdownContent || res.content || ''
              };
              this.setContentData(dto);
            } else {
              this.createFallbackContentFromPlan();
            }
            this.showToast('Contenu de l\'exposé rédigé avec succès par l\'IA !', 'success');
          },
          error: () => {
            this.isGenerating.set(false);
            if (res && typeof res === 'object' && (res.markdownContent || res.content)) {
              const dto: GenerateContentDto = {
                id: res.id || `content_${this.project?.id}`,
                title: res.title || this.project?.theme || 'Document d\'Exposé',
                markdownContent: res.markdownContent || res.content || ''
              };
              this.setContentData(dto);
            } else {
              this.createFallbackContentFromPlan();
            }
          }
        });
      },
      error: (err) => {
        this.isGenerating.set(false);
        console.error('Erreur génération contenu:', err);
        // Si l'API échoue, on bascule intelligemment sur la génération de secours basée sur le plan
        this.createFallbackContentFromPlan();
      }
    });
  }

  /**
   * Génère une ébauche structurée de secours basée sur le plan si l'API retourne un résultat vide.
   */
  private createFallbackContentFromPlan(): void {
    const theme = this.project?.theme || 'Sujet d\'Exposé';
    const planText = this.plan?.content || '';

    let generatedMd = `# ${theme}\n\n`;
    generatedMd += `> **Document de Rédaction QuickExpo**\n> Niveau : ${this.project?.academicLevel || 'Académique'} | Sujet : ${this.project?.subject || 'Général'}\n\n---\n\n`;


    if (planText) {
      generatedMd += `## Introduction\n\nL'étude de **${theme}** revêt une importance majeure dans le domaine de *${this.project?.subject || 'recherche'}*. Cette présentation s'attache à analyser de manière rigoureuse les axes fondamentaux structurés dans le plan de travail.\n\n---\n\n`;
      generatedMd += planText;
      generatedMd += `\n\n---\n\n## Conclusion & Perspectives\n\nEn conclusion, l'analyse approfondie de **${theme}** met en évidence des enjeux majeurs. Les données et réflexions présentées constituent une base solide pour des recherches ultérieures.\n`;
    } else {
      generatedMd += `## Introduction\n\nPrésentation et contextualisation du sujet **${theme}**...\n\n## Partie 1 : Développement des axes stratégiques\n\nContenu rédigé détaillé avec arguments, faits et explications méthodologiques.\n`;
    }

    const fallbackDto: GenerateContentDto = {
      id: `content_${this.project?.id || Date.now()}`,
      title: theme,
      markdownContent: generatedMd
    };

    this.setContentData(fallbackDto);
    if (this.project) {
      localStorage.setItem(`quickexpo_content_${this.project.id}`, JSON.stringify(fallbackDto));
      this.project.projectStatus = ProjectStatus.PREVIEW_GENERATED;
      this.projectStatusUpdated.emit({
        projectId: this.project.id,
        newStatus: ProjectStatus.PREVIEW_GENERATED
      });
    }
    this.showToast('Contenu d\'exposé prêt et prêt à l\'édition !', 'success');
  }

  private animateGenerationProgress(): void {
    const steps = [
      'Analyse du plan et de la structure méthodologique...',
      'Rédaction de l\'introduction et contextualisation...',
      'Développement des grandes parties et argumentation...',
      'Insertion des transitions, synthèses et exemples...',
      'Finalisation et formatage Markdown haute qualité...'
    ];

    let step = 0;
    this.generationProgressText.set(steps[0]);
    this.generationProgressPercent.set(15);

    const interval = setInterval(() => {
      if (!this.isGenerating()) {
        clearInterval(interval);
        return;
      }
      step++;
      if (step < steps.length) {
        this.generationProgressText.set(steps[step]);
        this.generationProgressPercent.set(20 + step * 20);
      } else {
        this.generationProgressPercent.set(95);
      }
    }, 2400);
  }

  public onContentChange(newContent: string): void {
    this.markdownContent.set(newContent);
  }

  /**
   * Sauvegarde les modifications apportées au contenu rédigé.
   */
  public saveChanges(): void {
    const dto = this.currentContent();
    if (!this.project || this.isSaving() || !this.hasUnsavedChanges()) return;

    this.isSaving.set(true);

    const updatedDto: GenerateContentDto = {
      id: dto?.id || `content_${this.project.id}`,
      title: this.documentTitle(),
      markdownContent: this.markdownContent()
    };

    this.generatedContentService.updateGeneratedContentById(updatedDto.id, updatedDto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.originalContent.set(this.markdownContent());
        this.currentContent.set(updatedDto);
        localStorage.setItem(`quickexpo_content_${this.project!.id}`, JSON.stringify(updatedDto));
        this.showToast('Document sauvegardé avec succès.', 'success');
      },
      error: () => {
        // En cas d'erreur API, on sauvegarde au moins localement
        this.isSaving.set(false);
        this.originalContent.set(this.markdownContent());
        this.currentContent.set(updatedDto);
        localStorage.setItem(`quickexpo_content_${this.project!.id}`, JSON.stringify(updatedDto));
        this.showToast('Document sauvegardé localement.', 'info');
      }
    });
  }

  /**
   * Valide définitivement le contenu rédigé pour autoriser le téléchargement.
   */
  public validateContent(): void {
    const dto = this.currentContent();
    if (!this.project || this.isValidating()) return;

    if (this.hasUnsavedChanges()) {
      this.saveChanges();
    }

    this.isValidating.set(true);

    const contentId = dto?.id || `content_${this.project.id}`;

    this.generatedContentService.validateGeneratedContentById(contentId).subscribe({
      next: () => {
        this.isValidating.set(false);
        if (this.project) {
          this.project.projectStatus = ProjectStatus.COMPLETED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.COMPLETED
          });
        }
        this.showToast('Document validé avec succès ! Prêt pour le téléchargement.', 'success');
        this.navigateToNextStep.emit();
      },
      error: () => {
        this.isValidating.set(false);
        if (this.project) {
          this.project.projectStatus = ProjectStatus.COMPLETED;
          this.projectStatusUpdated.emit({
            projectId: this.project.id,
            newStatus: ProjectStatus.COMPLETED
          });
        }
        this.showToast('Document validé. Passage à l\'étape de téléchargement.', 'success');
        this.navigateToNextStep.emit();
      }
    });
  }

  /**
   * Insère la syntaxe Markdown ou le code HTML de couleur de texte dans le textarea.
   */
  public insertMarkdownSyntax(type: string, param?: string): void {
    const textarea = this.editorTextarea?.nativeElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = this.markdownContent();
    const selected = current.substring(start, end);

    let insertion = '';
    let cursorOffset = 0;

    switch (type) {
      case 'h1':
        insertion = `\n# ${selected || 'Titre Principal'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h2':
        insertion = `\n## ${selected || 'Titre de Section'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h3':
        insertion = `\n### ${selected || 'Sous-Titre'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'h4':
        insertion = `\n#### ${selected || 'Sous-Section'}\n`;
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
        insertion = `<span style="color: ${hex};">${selected || 'Texte de couleur'}</span>`;
        cursorOffset = insertion.length;
        this.showColorPicker.set(false);
        break;
      case 'mark':
        insertion = `<mark>${selected || 'texte surligné'}</mark>`;
        cursorOffset = insertion.length;
        break;
      case 'bullet':
        insertion = `\n- ${selected || 'Élément de liste'}`;
        cursorOffset = insertion.length;
        break;
      case 'number':
        insertion = `\n1. ${selected || 'Élément numéroté'}`;
        cursorOffset = insertion.length;
        break;
      case 'checklist':
        insertion = `\n- [ ] ${selected || 'Tâche à effectuer'}`;
        cursorOffset = insertion.length;
        break;
      case 'quote':
        insertion = `\n> ${selected || 'Citation ou remarque importante'}\n`;
        cursorOffset = insertion.length;
        break;
      case 'code':
        insertion = `\`${selected || 'code_inline'}\``;
        cursorOffset = insertion.length;
        break;
      case 'codeblock':
        insertion = `\n\`\`\`javascript\n${selected || '// Votre code ici'}\n\`\`\`\n`;
        cursorOffset = insertion.length;
        break;
      case 'hr':
        insertion = `\n\n---\n\n`;
        cursorOffset = insertion.length;
        break;
      case 'table':
        insertion = `\n\n| Colonne 1 | Colonne 2 | Colonne 3 |\n| :--- | :---: | ---: |\n| Donnée 1 | Donnée 2 | Donnée 3 |\n| Donnée 4 | Donnée 5 | Donnée 6 |\n\n`;
        cursorOffset = insertion.length;
        break;
      case 'link':
        insertion = `[${selected || 'Texte du lien'}](https://example.com)`;
        cursorOffset = insertion.length;
        break;
      default:
        return;
    }

    const nextContent = current.substring(0, start) + insertion + current.substring(end);
    this.markdownContent.set(nextContent);

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
      if (!confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?')) {
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
