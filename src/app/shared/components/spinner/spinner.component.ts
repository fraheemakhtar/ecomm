import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-spinner',
  template: `
    <div class="spinner-overlay">
      <div class="spinner">
        <div class="spinner-ring"></div>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }
    .spinner-ring {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #e94560;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {}
