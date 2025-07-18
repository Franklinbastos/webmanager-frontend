import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceUpdateService {
  private financeUpdatedSource = new Subject<void>();

  financeUpdated$ = this.financeUpdatedSource.asObservable();

  triggerFinanceUpdate() {
    this.financeUpdatedSource.next();
  }
}
