import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  checkIn(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkin`, data);
  }

  checkOut(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, data);
  }

  getHistory(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history/${employeeId}`);
  }

  getManagerReports(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/manager/reports`, filters);
  }

  downloadExcel(filters: any): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/manager/download`, filters, {
      responseType: 'blob'
    });
  }
}
