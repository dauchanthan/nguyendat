import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoronaService {
  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    const url = 'https://api.covid19api.com/summary';
    return this.http.get(url).pipe();
  }

  getCountriesData(): Observable<any> {
    const url = 'https://api.covid19api.com/countries';
    return this.http.get(url).pipe();
  }
  getCoronaData(country): Observable<any> {
    const url = 'https://api.covid19api.com/total/dayone/country/' + country;
    return this.http.get(url).pipe();
  }
}
