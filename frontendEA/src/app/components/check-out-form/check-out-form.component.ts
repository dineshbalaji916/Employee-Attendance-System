import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private http: HttpClient,
    private snackBar: MatSnackBar
  ){
    this.checkOutForm = this.fb.group({
      employeeId: ['', [Validators.required, Validators.pattern(/^EMP\d{3}$/)]]
    });
  }
  onSubmit(): void {
    if (this.checkOutForm.valid) {
      this.http.post('http://localhost:3000/api/checkout', this.checkOutForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', { duration: 3000, panelClass: 'snackbar-success' });
          this.checkOutForm.reset();
        },
        error: err => {
          const errorMessage = err.error?.message || 'Check-Out failed.';
          this.snackBar.open(errorMessage, 'Close', { duration: 4000, panelClass: 'snackbar-error' });
          console.error('Check-Out Error:', err);
        }
      });
    }
  }
}
