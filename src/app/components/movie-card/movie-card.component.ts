import { NgClass } from '@angular/common';
import { Component ,inject } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  imports: [NgClass ,RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: any;

  private route = inject(ActivatedRoute);
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    if (this.movie) {
      this.movie.isFavorite = this.movieService.isMovieInWatchlist(this.movie.id);
    }
  }

  toggleFavorite(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.movie.isFavorite = this.movieService.toggleWatchlist({
      id: this.movie.id,
      title: this.movie.title,
      releaseDate: this.movie.releaseDate,
      image: this.movie.image,
      rating: this.movie.rating,
      overview: this.movie.overview,
      vote_count: this.movie.vote_count,
      vote_average: this.movie.vote_average,

    });
    console.log(this.movie.isFavorite);

  }
}
