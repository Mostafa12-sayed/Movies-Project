import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { MovieService } from '../../services/movie.service';
import { retry } from 'rxjs';
// import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist',
  imports: [NgFor,RouterLink , NgClass, SlicePipe], // Add NgClass and SlicePipe here,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
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

  getStars(value :number) 
  { 
    this.stars = []; // Reset stars array
      if(value ==0)
      {
         []
      }
      for(let i =2 ; i < value ; value-=2)
      {
        this.stars.push(i);
        
      }
      // console.log(this.stars);

      return this.stars;
  }
}

