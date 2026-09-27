import { Component, OnInit, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { ProjectSessionService } from '../../../services/project-session.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectSessionResponse } from '../../../models/ProjectSessionResponse';
import { ProjectSessionRequest } from '../../../models/ProjectSessionRequest';
import { ProjectSessionID } from '../../../models/ProjectSessionID';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {

  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();
  @Output() projectCreated = new EventEmitter<void>();

  readonly isClosing = signal(false);
  readonly isSubmitting = signal(false);

  public projectSession = inject(ProjectSessionService);

  public projectForm: FormGroup = new FormGroup({
    theme: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    description: new FormControl('Description du projet...', [Validators.required]),
    academicLevel: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    expectedPages: new FormControl('', [Validators.required]),
  });
    
  constructor() { }

  ngOnInit(): void {
  }

  public createProjectSession(): void {
    // Idempotency check: if already submitting or form is invalid, ignore click
    if (this.isSubmitting() || !this.projectForm.valid) {
      return;
    }

    this.isSubmitting.set(true);

    const projectSessionRequest: ProjectSessionRequest = {
      theme: this.projectForm.get('theme')?.value,
      subject: this.projectForm.get('subject')?.value,
      description: this.projectForm.get('description')?.value,
      academicLevel: this.projectForm.get('academicLevel')?.value,
      language: this.projectForm.get('language')?.value,
      expectedPages: Number(this.projectForm.get('expectedPages')?.value)
    };

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : '';

    this.projectSession.createProjectSession(userId, projectSessionRequest).subscribe({
      next: (response: ProjectSessionID) => {
        this.isSubmitting.set(false);
        localStorage.setItem('sessionId', response.sessionId);
        this.projectForm.reset({
          theme: '',
          subject: '',
          description: 'Description du projet...',
          academicLevel: '',
          language: '',
          expectedPages: ''
        });
        this.projectCreated.emit();
        this.closeModal();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error creating project session:', err);
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  
}