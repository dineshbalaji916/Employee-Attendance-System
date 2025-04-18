import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule
  ],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  constructor(private http: HttpClient) { }
  displayedColumns: string[] = ['date', 'employeeName', 'employeeId', 'department', 'checkIn', 'checkOut'];

  dataSource = [
    {
      date: '2025-04-10',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM'
    },
    {
      date: '2025-04-09',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      checkIn: '09:15 AM',
      checkOut: '04:45 PM'
    }
  ];

  departments = ['HR', 'IT', 'Finance', 'Marketing'];

  filters = {
    employeeName: '',
    department: '',
    startDate: '',
    endDate: ''
  };

  applyFilters(): void {
    this.http.post<any[]>('http://localhost:3000/api/manager/reports', this.filters).subscribe({
      next: (data: any[]) => {
        this.dataSource = data;
      },
      error: (err: any) => {
        console.error('Filter fetch error:', err);
      }
    });
  }
  resetFilters(): void {
    this.filters = {
      employeeName: '',
      department: '',
      startDate: '',
      endDate: ''
    };

    this.loadUnfilteredData();
  }


  ngOnInit(): void {
    this.loadUnfilteredData();
  }

  loadUnfilteredData(): void {
    this.http.post<any[]>('http://localhost:3000/api/manager/reports', {}).subscribe({
      next: (data: any[]) => {
        this.dataSource = data;
      },
      error: (err: any) => {
        console.error('Initial fetch error:', err);
      }
    });
  }

}
