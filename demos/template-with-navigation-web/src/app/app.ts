import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Top Navigation Bar -->
    <nav class="navbar">
      <div class="logo">🦄 Pegasus Web</div>
      <div class="links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container">
      <router-outlet></router-outlet>
      
      <!-- Default Content if no route matched -->
      <div *ngIf="!hasRoute()" class="placeholder">
        <h1>Welcome to Pegasus Web</h1>
        <p>This is a standard Web Layout with Top Navigation.</p>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 2rem; background: #2c3e50; color: white;
    }
    .logo { font-weight: bold; font-size: 1.2rem; }
    .links a {
      color: #ecf0f1; text-decoration: none; margin-left: 20px;
      transition: color 0.3s;
    }
    .links a.active { color: #3498db; font-weight: bold; }
    .container { padding: 40px; text-align: center; }
  `]
})
export class App {
  protected readonly title = signal('template-with-navigation-web');
  protected readonly hasRoute = signal(true); 
}
