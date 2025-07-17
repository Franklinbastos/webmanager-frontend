
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FixedFinance {
  id?: number;
  userId?: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FixedFinancesService {
  private baseUrl = 'http://localhost:5229/api/FixedFinances';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getFixedFinances(): Observable<FixedFinance[]> {
    return this.http.get<FixedFinance[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getFixedFinanceById(id: number): Observable<FixedFinance> {
    return this.http.get<FixedFinance>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createFixedFinance(fixedFinance: FixedFinance): Observable<FixedFinance> {
    return this.http.post<FixedFinance>(this.baseUrl, fixedFinance, { headers: this.getAuthHeaders() });
  }

  updateFixedFinance(id: number, fixedFinance: FixedFinance): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, fixedFinance, { headers: this.getAuthHeaders() });
  }

  deleteFixedFinance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
