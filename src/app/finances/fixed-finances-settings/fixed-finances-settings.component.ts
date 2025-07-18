
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FixedFinance, FixedFinancesService } from '../../services/fixed-finances.service';
import { FinanceUpdateService } from '../../services/finance-update.service';

@Component({
  selector: 'app-fixed-finances-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fixed-finances-settings.component.html',
  styleUrls: ['./fixed-finances-settings.component.scss']
})
export class FixedFinancesSettingsComponent implements OnInit {
  fixedFinances: FixedFinance[] = [];
  fixedFinanceForm: FormGroup;
  isEditing = false;
  currentFixedFinanceId: number | null = null;

  constructor(private fixedFinancesService: FixedFinancesService, private fb: FormBuilder, private financeUpdateService: FinanceUpdateService) {
    this.fixedFinanceForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      type: ['expense', Validators.required],
      numberOfMonths: [1, [Validators.required, Validators.min(1)]],
      billingDay: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadFixedFinances();
  }

  loadFixedFinances(): void {
    this.fixedFinancesService.getFixedFinances().subscribe(data => {
      this.fixedFinances = data;
    });
  }

  onSubmit(): void {
    if (this.fixedFinanceForm.valid) {
      const fixedFinanceData = this.fixedFinanceForm.value;
      if (this.isEditing && this.currentFixedFinanceId !== null) {
        this.fixedFinancesService.updateFixedFinance(this.currentFixedFinanceId, { ...fixedFinanceData, id: this.currentFixedFinanceId }).subscribe(() => {
          this.loadFixedFinances();
          this.resetForm();
          this.financeUpdateService.triggerFinanceUpdate(); // Trigger update in finance list
        });
      } else {
        this.fixedFinancesService.createFixedFinance(fixedFinanceData).subscribe(() => {
          this.loadFixedFinances();
          this.resetForm();
        });
      }
    }
  }

  editFixedFinance(fixedFinance: FixedFinance): void {
    this.isEditing = true;
    this.currentFixedFinanceId = fixedFinance.id!;
    this.fixedFinanceForm.patchValue(fixedFinance);
  }

  deleteFixedFinance(id: number): void {
    this.fixedFinancesService.deleteFixedFinance(id).subscribe(() => {
      this.loadFixedFinances();
    });
  }

  generateRecurrentFinances(): void {
    this.fixedFinancesService.generateRecurrentFinances().subscribe({
      next: (response) => {
        console.log(response.message);
        this.loadFixedFinances(); // Reload fixed finances after generation
      },
      error: (err) => {
        console.error('Error generating recurrent finances:', err);
      }
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentFixedFinanceId = null;
    this.fixedFinanceForm.reset({ type: 'expense', isActive: true, numberOfMonths: 1, billingDay: 1 });
  }
}
