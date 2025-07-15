import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService, User } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class RegisterComponent {
  newUser: User = { name: '', email: '', password: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  register(): void {
    this.apiService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}
