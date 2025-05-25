import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginError = '';
    console.log(this.loginForm.value);

    this.authService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value
    ).subscribe({
      next: () => {
        localStorage.setItem('username', this.loginForm.get('username')?.value);
        this.notificationService.authentificationMessageSuccess(
          "Logged in!",
          "Successfully logged in redirecting to home.."
        );
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.router.navigate(['/login']);
        this.loginError = 'Invalid username or password';
        this.notificationService.errorNotification(
          'Login failed',
          'Invalid username or password'
        );
      }
    });
  }


}
