import { Component, Input, Output, EventEmitter, inject, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectSessionService } from '../../../services/project-session.service';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { ProjectSessionRequest } from '../../../models/ProjectSessionRequest';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() project: ProjectSessionResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() projectUpdated = new EventEmitter<void>();

  readonly isSubmitting = signal(false);
  private projectSessionService = inject(ProjectSessionService);

  public editForm: FormGroup = new FormGroup({
    theme: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    academicLevel: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    expectedPages: new FormControl('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.editForm.patchValue({
        theme: this.project.theme || '',
        subject: this.project.subject || '',
        description: this.project.description || '',
        academicLevel: this.project.academicLevel || '',
        language: this.project.language || '',
        expectedPages: this.project.expectedPages || ''
      });
    }
  }

  public updateProject(): void {
    if (this.isSubmitting() || !this.editForm.valid || !this.project?.id) {
      return;
    }

    this.isSubmitting.set(true);

    const updatedRequest: ProjectSessionRequest = {
      theme: this.editForm.get('theme')?.value,
      subject: this.editForm.get('subject')?.value,
      description: this.editForm.get('description')?.value,
      academicLevel: this.editForm.get('academicLevel')?.value,
      language: this.editForm.get('language')?.value,
      expectedPages: Number(this.editForm.get('expectedPages')?.value)
    };

    this.projectSessionService.updateProjectSessionById(this.project.id, updatedRequest).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.projectUpdated.emit();
        this.closeModal();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Erreur lors de la modification du projet:', err);
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
