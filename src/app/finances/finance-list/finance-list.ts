import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Finance } from '../../services/api';
import { FixedFinancesService, FixedFinance } from '../../services/fixed-finances.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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
  

  constructor(private apiService: ApiService, private router: Router, private fixedFinancesService: FixedFinancesService) { }

  ngOnInit(): void {
    this.loadAllFinances();
  }

  loadAllFinances(): void {
    forkJoin({
      finances: this.apiService.getFinances(),
      fixedFinances: this.fixedFinancesService.getFixedFinances()
    }).subscribe({
      next: (data) => {
        const regularFinances = data.finances;
        const fixedFinancesAsRegular = data.fixedFinances.map(ff => ({
          id: ff.id,
          userId: ff.userId,
          date: new Date(), // Use current date for display
          description: ff.description + ' (Fixed)',
          amount: ff.amount,
          type: ff.type
        } as Finance));

        this.finances = [...regularFinances, ...fixedFinancesAsRegular].sort((a, b) => a.date.getTime() - b.date.getTime());
      },
      error: (err) => {
        console.error('Error loading finances:', err);
        this.errorMessage = 'Failed to load finances. Please try logging in again.';
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

  goToFixedFinancesSettings(): void {
    this.router.navigate(['/app/finances/fixed-settings']);
  }
}