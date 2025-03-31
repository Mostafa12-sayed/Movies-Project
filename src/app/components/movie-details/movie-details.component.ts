import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  imports: [NgFor , MovieCardComponent ,NgClass],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  recommendations: any[] = [];
  movieId!: number;
  stars: number[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = Number(params.get('id'));
      console.log(Number(params.get('id')));
      this.getMovieDetails();
      this.getRecommendations();
    });

  }

  getMovieDetails(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe(data => {
      console.log(data);
      this.getStars(data.vote_average);

      this.movie = {
        id: data.id,
        title: data.title,
        overview: data.overview,
        releaseDate: data.release_date,
        rating: data.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        genres: data.genres,
        duration: data.runtime,
        language: data.original_language,
        productionCompanies: data.production_companies,
        website: data.homepage,
        vote_count : data.vote_count,
      };
      console.log(this.movie);
    });

  }

  getRecommendations(): void {
    this.movieService.getRecommendations(this.movieId).subscribe(data => {
      this.recommendations = data.results.map((movie: any) => ({
        // title: movie.title,
        // releaseDate: movie.release_date,
        // rating: movie.vote_average,
        // poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        title: movie.title,
        releaseDate: movie.release_date,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
        id: movie.id,
      }));
    });
  }

  getStars(value :number)
  {
      if(value ==0)
      {
         []
      }
      for(let i =2 ; i < value ; value-=2)
      {
        this.stars.push(i);
        
      }
  }
}
