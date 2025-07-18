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

export interface FinanceUpdateDto {
  id?: number;
  userId?: number;
  date: string; // Date as ISO string for backend
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5230';

  constructor(private http: HttpClient) {}

  

  // --- User Endpoints ---

  login(credentials: LoginDto): Observable<string> {
    return this.http.post(`${this.baseUrl}/Users/login`, credentials, { responseType: 'text' });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/Users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users`, {});
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/Users/${id}`, {});
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/Users/${id}`, user, {});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Users/${id}`, {});
  }

  // --- Finance Endpoints ---

  getFinances(): Observable<Finance[]> {
    return this.http.get<Finance[]>(`${this.baseUrl}/Finances`, {});
  }

  getFinanceById(id: number): Observable<Finance> {
    return this.http.get<Finance>(`${this.baseUrl}/Finances/${id}`, {});
  }

  createFinance(finance: Finance): Observable<Finance> {
    return this.http.post<Finance>(`${this.baseUrl}/Finances`, finance, {});
  }

  updateFinance(id: number, finance: FinanceUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/Finances/${id}`, finance, {});
  }

  deleteFinance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Finances/${id}`, {});
  }
}