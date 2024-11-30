import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert-success',
  standalone: true,
  imports: [],
  templateUrl: './alert-success.component.html',
  styleUrl: './alert-success.component.scss',
})
export class AlertSuccessComponent implements OnInit, OnDestroy {
  message: string | null = null;
  private alertSubscription: Subscription | undefined;
  constructor(private alertService: AlertService) {}
  ngOnInit() {
    this.alertSubscription = this.alertService.alert$.subscribe((message) => {
      this.message = message;
      if (message) {
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
