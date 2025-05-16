import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ApplicationFormComponent {
  @Output() applicationCreated = new EventEmitter<Application>();

  applicationForm: FormGroup;
  submitting = false;
  error = '';

  applicationTypes = [
    { value: 'request', label: 'Request' },
    { value: 'offer', label: 'Offer' },
    { value: 'complaint', label: 'Complaint' }
  ];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService
  ) {
    this.applicationForm = this.fb.group({
      type: ['request', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.submitting = true;
      this.error = '';

      this.applicationService.createApplication(this.applicationForm.value).subscribe({
        next: (newApplication) => {
          this.submitting = false;
          this.applicationCreated.emit(newApplication);
          this.resetForm();
        },
        error: (err) => {
          this.submitting = false;
          this.error = 'Failed to create application. Please try again.';
          console.error('Error creating application:', err);
        }
      });
    }
  }

  resetForm() {
    this.applicationForm.reset({
      type: 'request',
      message: ''
    });
  }
}
