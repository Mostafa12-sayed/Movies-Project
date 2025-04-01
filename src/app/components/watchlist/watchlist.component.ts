import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass, SlicePipe, TranslateModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  movies: any[] = [];
  stars: number[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.movies = this.movieService.getWatchlist();
    console.log(this.movies);
  }

  removeFromWatchlist(movieId: number): void {
    this.movieService.removeFromWatchlist(movieId);
    this.loadWatchlist();
  }

  getStars(value: number): number[] {
    this.stars = [];
    if (value == 0) {
      return [];
    }
    for (let i = 2; i < value; value -= 2) {
      this.stars.push(i);
    }
    return this.stars;
  }
}

