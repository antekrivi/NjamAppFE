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
export class NavbarComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pretpostavka: korisnički usernaem je spremljen u localStorage pri loginu
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
    }
  }

  logoutNotification(): void {
    const username = localStorage.getItem('username');
    if(username){
      this.authService.logout();
      this.notificationService.authentificationMessageSuccess(
        "Logged out!",
        `Successfully logged out ${username}. Redirecting to login page...`
      );
    }
  }
}
