import { Component, OnInit, OnDestroy, Renderer2, signal } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';
import { ApplicationFormComponent } from "../application-form/application-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
  standalone: true,
  imports: [ApplicationFormComponent, CommonModule]
})
export class ApplicationsListComponent implements OnInit, OnDestroy {
  applications = signal<Application[]>([]);
  loading: boolean = true;
  error: string = '';
  showForm: boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private renderer: Renderer2
  ) { }
  ngOnInit(): void {
    this.loadApplications();
    this.setupRealtimeUpdates();
    // Add keyboard event listener for Escape key
    this.renderer.listen('document', 'keydown', (event) => {
      if (event.key === 'Escape' && this.showForm) {
        this.closeForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.applicationService.stopConnection();
  }

  private setupRealtimeUpdates(): void {
    this.applicationService.startConnection()
      .then(() => {
        console.log('Connected to SignalR hub');
        this.applicationService.onStatusUpdate((updatedApplication) => {
          console.log('Status update received:', updatedApplication);
          // Find and update the application in the list
          const currentApplications = this.applications();
          const index = currentApplications.findIndex((a: Application) => a.id === updatedApplication.id);
          if (index !== -1) {
            const updatedApplications = [...currentApplications];
            updatedApplications[index] = updatedApplication;
            this.applications.set(updatedApplications);
          }
        });
      })
      .catch(err => {
        console.error('Error connecting to SignalR hub:', err);
        this.error = 'Failed to connect to real-time updates service.';
      });
  }

  loadApplications(): void {
    this.loading = true;
    this.applicationService.getApplications().subscribe({
      next: (data) => {
        this.applications.set(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
        this.error = 'Failed to load applications. Please try again.';
        this.loading = false;
      }
    });
  }

  openForm(): void {
    this.showForm = true;
    // Add modal-open class and styles to body
    this.renderer.addClass(document.body, 'modal-open');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'paddingRight', '15px');
  }

  closeForm(): void {
    this.showForm = false;
    // Remove modal-open class and styles from body
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'paddingRight');
  }

  onApplicationCreated(newApplication: Application): void {
    this.applications.update(apps => [newApplication, ...apps]);
    this.closeForm();
  }

  getStatusClass(status: string): string {
    return status === 'completed' ? 'badge bg-success' : 'badge bg-warning';
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'request':
        return 'badge bg-primary';
      case 'offer':
        return 'badge bg-info';
      case 'complaint':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
