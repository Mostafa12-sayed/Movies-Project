import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiKey = 'c8313d74c2b28233c4274303e35bddde';
  private baseUrl = 'https://api.themoviedb.org/3/tv'; 

  constructor(private http: HttpClient) {}

  getTvShows(page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/popular?api_key=${this.apiKey}&language=en-US&page=${page}`;
    return this.http.get(url).pipe(
      catchError(this.handleError) 
    );
  }

  getTvShowDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get(url).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error occurred:', error);
    return new Observable(); 
  }
}
