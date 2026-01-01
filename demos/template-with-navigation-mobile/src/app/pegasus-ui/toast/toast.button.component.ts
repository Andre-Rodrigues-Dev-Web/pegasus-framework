import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'pegasus-toast-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="showToast()" class="pegasus-btn">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .pegasus-btn {
      padding: 12px 24px;
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      color: #333;
      border: none;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .pegasus-btn:active { transform: scale(0.95); }
  `]
})
export class PegasusToastButtonComponent {
  @Input() message: string = 'Hello from Pegasus!';
  @Input() duration: 'short' | 'long' = 'short';

  async showToast() {
    await Toast.show({
      text: this.message,
      duration: this.duration,
    });
  }
}
