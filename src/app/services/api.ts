import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces baseadas nos modelos C#
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string; // Opcional, pois não queremos enviar o hash da senha de volta para o cliente
}

export interface LoginDto {
  email: string;
  password?: string;
}

export interface Finance {
  id?: number;
  userId?: number;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5229';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // --- User Endpoints ---

  login(credentials: LoginDto): Observable<string> {
    return this.http.post(`${this.baseUrl}/Users/login`, credentials, { responseType: 'text' });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/Users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users`, { headers: this.getAuthHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/Users/${id}`, { headers: this.getAuthHeaders() });
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/Users/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Users/${id}`, { headers: this.getAuthHeaders() });
  }

  // --- Finance Endpoints ---

  getFinances(): Observable<Finance[]> {
    return this.http.get<Finance[]>(`${this.baseUrl}/Finances`, { headers: this.getAuthHeaders() });
  }

  getFinanceById(id: number): Observable<Finance> {
    return this.http.get<Finance>(`${this.baseUrl}/Finances/${id}`, { headers: this.getAuthHeaders() });
  }

  createFinance(finance: Finance): Observable<Finance> {
    return this.http.post<Finance>(`${this.baseUrl}/Finances`, finance, { headers: this.getAuthHeaders() });
  }

  updateFinance(id: number, finance: Finance): Observable<any> {
    return this.http.put(`${this.baseUrl}/Finances/${id}`, finance, { headers: this.getAuthHeaders() });
  }

  deleteFinance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Finances/${id}`, { headers: this.getAuthHeaders() });
  }
}