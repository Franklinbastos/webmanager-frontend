import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Finance } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance-list.html',
  styleUrls: ['./finance-list.scss']
})
export class FinanceListComponent implements OnInit {
  finances: Finance[] = [];
  newFinance: Finance = { date: new Date(), description: '', amount: 0, type: 'expense' };
  errorMessage: string = '';
  showAddForm: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadFinances();
  }

  loadFinances(): void {
    this.apiService.getFinances().subscribe({
      next: (data) => {
        this.finances = data;
      },
      error: (err) => {
        console.error('Error loading finances:', err);
        this.errorMessage = 'Failed to load finances. Please try logging in again.';
        // Optionally, redirect to login if token is invalid
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  addFinance(): void {
    this.apiService.createFinance(this.newFinance).subscribe({
      next: (finance) => {
        this.finances.push(finance);
        this.newFinance = { date: new Date(), description: '', amount: 0, type: 'expense' }; // Reset form
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error adding finance:', err);
        this.errorMessage = 'Failed to add finance.';
      }
    });
  }

  

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}