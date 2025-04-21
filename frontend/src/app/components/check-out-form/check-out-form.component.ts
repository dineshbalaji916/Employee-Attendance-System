import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-check-out-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.css']
})
export class CheckOutFormComponent {
  checkOutForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private attendanceService: AttendanceService
  ) {
    this.checkOutForm = this.fb.group({
      employeeId: ['', [Validators.required, Validators.pattern(/^EMP\d{3}$/)]]
    });
  }

  onSubmit(): void {
    if (this.checkOutForm.valid) {
      this.attendanceService.checkOut(this.checkOutForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', { duration: 3000, panelClass: 'snackbar-success' });
          this.checkOutForm.reset();
          Object.keys(this.checkOutForm.controls).forEach(key => {
            const control = this.checkOutForm.get(key);
            control?.setErrors(null);
            control?.markAsPristine();
            control?.markAsUntouched();
          });
        },
        error: err => {
          const errorMessage = err.error?.message || 'Check-Out failed.';
          this.snackBar.open(errorMessage, 'Close', { duration: 4000, panelClass: 'snackbar-error' });
          console.error('Check-Out Error:', err);
        }
      });
    } else {
      this.snackBar.open('Please enter a valid Employee ID.', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
    }
  }
}
