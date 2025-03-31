import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { MovieService } from '../../services/movie.service';
// import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist',
  imports: [NgFor,RouterLink] ,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.movies = this.movieService.getWatchlist();
  }

  removeFromWatchlist(movieId: number): void {
    this.movieService.removeFromWatchlist(movieId);
    this.loadWatchlist();
  }
}

