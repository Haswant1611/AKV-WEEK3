import { Component } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notifiy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private notificatioService:NotificationService){

  }
} 