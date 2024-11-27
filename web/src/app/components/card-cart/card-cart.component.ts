import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [],
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.scss',
})
export class CardCartComponent {
  @Input() item: any;
}
