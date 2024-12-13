import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmAction() {
    this.confirm.emit(); // Emitir el evento de confirmación
  }

  cancelAction() {
    this.cancel.emit(); // Emitir el evento de cancelación
  }
}
