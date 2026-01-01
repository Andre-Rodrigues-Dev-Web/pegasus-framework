import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="mobile-layout">
      <div class="content">
        <router-outlet></router-outlet>
      </div>

      <!-- Bottom Tab Bar -->
      <nav class="tab-bar">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <span class="icon">🏠</span>
          <span>Home</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active">
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active">
          <span class="icon">👤</span>
          <span>Profile</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .mobile-layout { display: flex; flex-direction: column; height: 100vh; }
    .content { flex: 1; overflow-y: auto; padding: 20px; background: #f4f5f7; }
    .tab-bar {
      display: flex; justify-content: space-around; background: white;
      border-top: 1px solid #ddd; padding: 10px 0;
      padding-bottom: env(safe-area-inset-bottom);
    }
    .tab-bar a {
      display: flex; flex-direction: column; align-items: center;
      text-decoration: none; color: #7f8c8d; font-size: 0.8rem;
    }
    .tab-bar a.active { color: #3498db; }
    .icon { font-size: 1.5rem; margin-bottom: 2px; }
  `]
})
export class App {
  protected readonly title = signal('template-with-navigation-mobile');
}
