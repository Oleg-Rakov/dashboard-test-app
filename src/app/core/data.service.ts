import { Injectable, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const DASHBOARD_DATA_KEY = makeStateKey<any>('dashboard-data');

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = '/assets/api';
  constructor(private http: HttpClient, private transferState: TransferState) {}

  getDashboardData(): Observable<any> {
    const storedData = this.transferState.get(DASHBOARD_DATA_KEY, null);

    if (storedData) {
      return of(storedData);
    } else {
      return this.http.get(`${this.baseUrl}/dashboard-data.json`, { responseType: 'text' }).pipe(
        tap((data) => {
          try {
            const jsonData = JSON.parse(data);
            this.transferState.set(DASHBOARD_DATA_KEY, jsonData);
          } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw e;
          }
        })
      );
    }
  }

}
