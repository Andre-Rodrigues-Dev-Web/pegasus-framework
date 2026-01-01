import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PegasusCameraComponent } from './pegasus-ui/camera/camera.component';

@Component({ template: '<h2>📱 Dashboard</h2><p>Welcome to Pegasus Mobile.</p>', standalone: true }) class DashboardComponent {}
@Component({ template: '<h2>⚙️ Settings</h2><p>App Version: 1.0.0</p>', standalone: true }) class SettingsComponent {}

@Component({
  standalone: true,
  imports: [CommonModule, PegasusCameraComponent],
  template: `
    <h2>👤 User Profile</h2>
    <div class="card">
       <p>Update your avatar:</p>
       <pegasus-camera (imageCaptured)="onCapture($event)"></pegasus-camera>
       <div *ngIf="avatar" class="avatar-preview">
         <img [src]="avatar" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
       </div>
    </div>
  `,
  styles: [`
    .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;}
    .avatar-preview { margin-top: 15px; }
  `]
})
class ProfileComponent {
  avatar = '';
  onCapture(url: string) { this.avatar = url; }
}

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent }
];
