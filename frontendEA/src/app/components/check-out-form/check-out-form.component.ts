import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

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
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.checkOutForm = this.fb.group({
      employeeId: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.checkOutForm.valid) {
      this.http.post('http://localhost:3000/api/checkout', this.checkOutForm.value).subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.checkOutForm.reset();
        },
        error: err => {
          console.error('Check-Out Error:', err);
          this.message = 'Check-Out failed.';
        }
      });
    }
  }
}
