
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
  private baseUrl = 'http://localhost:5230/api/Goals';

  constructor(private http: HttpClient) {}

  

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.baseUrl, {});
  }

  getGoalById(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.baseUrl}/${id}`, {});
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.baseUrl, goal, {});
  }

  updateGoal(id: number, goal: Goal): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, goal, {});
  }

  deleteGoal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {});
  }
}
