import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advisor } from '../models/Advisor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdvisorService {
  constructor(private http: HttpClient) {}
  
  link = 'http://localhost:8080/advisors';

  getAdvisorById(id: string): Observable<Advisor> {
    return this.http.get<Advisor>(`${this.link}/${id}`);
  }

}
