import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Finance, FinanceUpdateDto } from '../../services/api';
import { FixedFinancesService, FixedFinance } from '../../services/fixed-finances.service';
import { FinanceUpdateService } from '../../services/finance-update.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

type EditableFinance = Finance & { editingDate?: boolean, editingAmount?: boolean };

@Component({
  selector: 'app-finance-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance-list.html',
  styleUrls: ['./finance-list.scss']
})
export class FinanceListComponent implements OnInit {
  finances: EditableFinance[] = [];
  newFinance: Finance = { date: new Date(), description: '', amount: 0, type: 'expense' };
  errorMessage: string = '';
  

  constructor(private apiService: ApiService, private router: Router, private fixedFinancesService: FixedFinancesService, private financeUpdateService: FinanceUpdateService) { }

  ngOnInit(): void {
    this.loadAllFinances();
    this.financeUpdateService.financeUpdated$.subscribe(() => {
      this.loadAllFinances();
    });
  }

  loadAllFinances(): void {
    forkJoin({
      finances: this.apiService.getFinances(),
      fixedFinances: this.fixedFinancesService.getFixedFinances()
    }).subscribe({
      next: (data) => {
        this.finances = data.finances.map(f => ({ ...f, editingDate: false, editingAmount: false })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        console.log('Loaded Finances:', this.finances); // Add this line
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
        this.finances.push({ ...finance, editingDate: false, editingAmount: false });
        this.newFinance = { date: new Date(), description: '', amount: 0, type: 'expense' }; // Reset form
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error adding finance:', err);
        this.errorMessage = 'Failed to add finance.';
      }
    });
  }

  updateFinance(finance: EditableFinance): void {
    if (finance.id) {
      // Ensure date is in correct format before sending to backend
      const financeToUpdate: FinanceUpdateDto = { 
        ...finance, 
        date: new Date(finance.date).toISOString(),
        amount: parseFloat(finance.amount.toFixed(2)) // Round to 2 decimal places
      };
      this.apiService.updateFinance(finance.id, financeToUpdate).subscribe({
        next: () => {
          console.log('Finance updated successfully!', finance);
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error updating finance:', err);
          this.errorMessage = 'Failed to update finance.';
        }
      });
    }
  }

  onEditAmount(finance: EditableFinance): void {
    finance.editingAmount = true;
    finance.amount = parseFloat(finance.amount.toFixed(2));
  }

  goToFixedFinancesSettings(): void {
    this.router.navigate(['/app/finances/fixed-settings']);
  }
}