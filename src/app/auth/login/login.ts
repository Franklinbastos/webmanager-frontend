import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService, LoginDto } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  credentials: LoginDto = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    this.apiService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login successful. Backend response:', response);
        // O backend retorna o token como uma string pura, não um objeto com a propriedade 'token'
        localStorage.setItem('authToken', response);
        console.log('Token stored in localStorage:', localStorage.getItem('authToken'));
        this.router.navigate(['/finances']);
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login error:', err);
      }
    });
  }
}