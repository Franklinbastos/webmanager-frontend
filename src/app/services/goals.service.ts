
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Goal {
  id?: number;
  userId?: number;
  item: string;
  value: number;
  description?: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private baseUrl = 'http://localhost:5229/api/Goals';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getGoalById(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.baseUrl, goal, { headers: this.getAuthHeaders() });
  }

  updateGoal(id: number, goal: Goal): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, goal, { headers: this.getAuthHeaders() });
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
