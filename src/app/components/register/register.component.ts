import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  register() {
    if(this.registerForm.valid) {
      const { username, firstName, lastName, password } = this.registerForm.value;
      console.log('Registration data:', { username, firstName, lastName, password });
      this.authService.register(username, firstName, lastName, password)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.notificationService.successNotificationRegisterWithRedirection(
              'Registration', 'Successfully registered! Redirecting to login...');
          },
          error: (error) => {
            console.error('Registration failed:', error);
            this.notificationService.errorNotification('Registration failed', 'An error occurred during registration');
          }
        });
    }
  }

}
