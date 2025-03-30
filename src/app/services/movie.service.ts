import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
  private apiKey = 'c8313d74c2b28233c4274303e35bddde';
  private apiUrl2 = 'https://api.themoviedb.org/3/movie';
  constructor(private http: HttpClient) {}

  getNowPlayingMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${movieId}?api_key=${this.apiKey}`);
  }
  getRecommendations(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${movieId}/recommendations?api_key=${this.apiKey}`);
  }
}