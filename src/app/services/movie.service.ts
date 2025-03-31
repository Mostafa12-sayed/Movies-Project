import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
  private apiKey = 'c8313d74c2b28233c4274303e35bddde';
  private apiUrl2 = 'https://api.themoviedb.org/3/movie';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
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

  private currentSearchQuery: string = '';

  setSearchQuery(query: string): void {
    this.currentSearchQuery = query;
  }

  getSearchQuery(): string {
    return this.currentSearchQuery;
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.searchUrl}?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}`);
  }

  private watchlistKey = 'movie-watchlist';
  private watchlist: any[] = [];
  watchlistChanges = new BehaviorSubject<void>(undefined);

  // Get watchlist from localStorage
  getWatchlist(): any[] {
    const watchlistStr = localStorage.getItem(this.watchlistKey);
    this.watchlist = watchlistStr ? JSON.parse(watchlistStr) : [];
    return this.watchlist;
  }

  // Save watchlist to localStorage
  saveWatchlist(watchlist: any[]): void {
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
    this.watchlistChanges.next();
  }

  // Add movie to watchlist
  addToWatchlist(movie: any): void {
    const watchlist = this.getWatchlist();
    if (!this.isMovieInWatchlist(movie.id)) {
      watchlist.push(movie);
      this.saveWatchlist(watchlist);
    }
  }

  // Remove movie from watchlist
  removeFromWatchlist(movieId: number): void {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    this.saveWatchlist(watchlist);
  }

  // Check if movie is in watchlist
  isMovieInWatchlist(movieId: number): boolean {
    return this.getWatchlist().some(movie => movie.id === movieId);
  }

  // Toggle movie in watchlist
  toggleWatchlist(movie: any): boolean {
    if (this.isMovieInWatchlist(movie.id)) {
      this.removeFromWatchlist(movie.id);
      return false;
    } else {
      this.addToWatchlist(movie);
      return true;
    }
  }

  
}


