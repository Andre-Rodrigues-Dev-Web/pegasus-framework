import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'pegasus-camera',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pegasus-camera-container">
      <button (click)="takePicture()" class="pegasus-btn">
        <ng-content>Take Picture</ng-content>
      </button>
      <div *ngIf="imageUrl" class="image-preview">
        <img [src]="imageUrl" alt="Captured Image" />
      </div>
    </div>
  `,
  styles: [`
    .pegasus-camera-container { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .pegasus-btn {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .pegasus-btn:active { transform: scale(0.95); }
    .image-preview img {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  `]
})
export class PegasusCameraComponent {
  imageUrl: string | undefined;
  @Output() imageCaptured = new EventEmitter<string>();

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      this.imageUrl = image.webPath;
      this.imageCaptured.emit(this.imageUrl);
    } catch (error) {
      console.warn('User cancelled or error:', error);
    }
  }
}
