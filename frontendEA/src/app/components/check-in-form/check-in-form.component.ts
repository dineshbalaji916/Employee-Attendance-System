import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-check-in-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css']
})
export class CheckInFormComponent {
  checkInForm: FormGroup;
  message: string = '';
  departments = ['HR', 'IT', 'Finance', 'Marketing'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.checkInForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.pattern(/^EMP\d{3}$/)]],
      department: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.checkInForm.valid) {
      this.http.post('http://localhost:3000/api/checkin', this.checkInForm.value).subscribe({
        next: (res: any) => {
          this.snackBar.open(res.message, 'Close', { duration: 3000, panelClass: 'snackbar-success' });
          this.checkInForm.reset();
        },
        error: err => {
          const errorMessage = err.error?.message || 'Check-In failed.';
          this.snackBar.open(errorMessage, 'Close', { duration: 4000, panelClass: 'snackbar-error' });
          console.error('Check-In Error:', err);
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: 'snackbar-error'
      });
    }
  }
   
}
