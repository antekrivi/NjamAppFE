import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}


  logoutNotification(): void {
    this.authService.logout();
    this.notificationService.authentificationMessageSuccess(
      "Logged out!",
      `Successfully logged out. Redirecting to login page...`
    );
  }
}
