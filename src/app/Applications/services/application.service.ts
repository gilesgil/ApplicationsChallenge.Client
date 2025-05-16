import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Application } from '../models/application.model';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}/api/applications`;
  private hubUrl = `${environment.apiUrl}/hubs/applications`;
  private hubConnection: signalR.HubConnection | undefined;

  constructor(private http: HttpClient) { }

  // Start the SignalR connection
  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start();
  }

  // Subscribe to status updates
  onStatusUpdate(callback: (application: Application) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveStatusUpdate', (application: Application) => {
        callback(application);
      });
    }
  }

  // Stop the SignalR connection
  stopConnection(): Promise<void> {
    return this.hubConnection ? this.hubConnection.stop() : Promise.resolve();
  }

  // API methods
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  createApplication(application: { type: string, message: string }): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplicationStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
