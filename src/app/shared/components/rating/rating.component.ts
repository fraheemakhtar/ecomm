import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-rating',
  template: `
    <div class="rating">
      <span class="stars">
        <span *ngFor="let star of stars" class="star" [class.filled]="star <= fullStars" [class.half]="star === halfStar">
          ★
        </span>
      </span>
      <span class="count">({{ count }})</span>
    </div>
  `,
  styles: [`
    .rating { display: flex; align-items: center; gap: 4px; }
    .stars { display: flex; }
    .star { color: #ddd; font-size: 1rem; }
    .star.filled { color: #ffc107; }
    .star.half { color: #ffc107; opacity: 0.6; }
    .count { font-size: 0.8rem; color: #666; }
  `]
})
export class RatingComponent {
  @Input() rate = 0;
  @Input() count = 0;

  get stars(): number[] { return [1, 2, 3, 4, 5]; }
  get fullStars(): number { return Math.floor(this.rate); }
  get halfStar(): number | null {
    return this.rate % 1 >= 0.5 ? Math.ceil(this.rate) : null;
  }
}
