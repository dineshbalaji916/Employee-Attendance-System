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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.checkInForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.checkInForm.valid) {
      this.http.post('http://localhost:3000/api/checkin', this.checkInForm.value).subscribe({
        next: (res: any) => {
          console.log('Check-In Response:', res); // ✅ DEBUG LINE
          this.message = res.message;             // ✅ show backend message
          this.checkInForm.reset();
        },
        error: err => {
          console.error('Check-In Error:', err);
          this.message = 'Check-In failed.';
        }
      });
    }
  }  
}
