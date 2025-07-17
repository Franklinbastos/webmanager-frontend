
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal, GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit {
  goals: Goal[] = [];
  goalForm: FormGroup;
  isEditing = false;
  currentGoalId: number | null = null;

  constructor(private goalsService: GoalsService, private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      item: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalsService.getGoals().subscribe(data => {
      this.goals = data;
    });
  }

  onSubmit(): void {
    if (this.goalForm.valid) {
      const goalData = this.goalForm.value;
      if (this.isEditing && this.currentGoalId !== null) {
        this.goalsService.updateGoal(this.currentGoalId, { ...goalData, id: this.currentGoalId }).subscribe(() => {
          this.loadGoals();
          this.resetForm();
        });
      } else {
        this.goalsService.createGoal(goalData).subscribe(() => {
          this.loadGoals();
          this.resetForm();
        });
      }
    }
  }

  editGoal(goal: Goal): void {
    this.isEditing = true;
    this.currentGoalId = goal.id!;
    this.goalForm.patchValue(goal);
  }

  deleteGoal(id: number): void {
    this.goalsService.deleteGoal(id).subscribe(() => {
      this.loadGoals();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentGoalId = null;
    this.goalForm.reset({ completed: false });
  }
}
