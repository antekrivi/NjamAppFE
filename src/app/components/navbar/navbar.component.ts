import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentLanguage = 'hr';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
      if (typeof window !== 'undefined' && localStorage) {
        const savedLang = localStorage.getItem('lang');
        this.currentLanguage = savedLang || 'hr';
        this.translate.use(this.currentLanguage);
    }
  }

  onLanguageChange(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('lang', lang);
    }
  }

  logoutNotification(): void {
    this.authService.logout();
    this.notificationService.authentificationMessageSuccess(
      "Logged out!",
      `Successfully logged out. Redirecting to login page...`
    );
  }
}
