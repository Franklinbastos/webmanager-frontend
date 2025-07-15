import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, LoginDto } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  credentials: LoginDto = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/finances']);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid credentials';
        console.error(err);
      }
    });
  }
}