import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgFor, NgIf } from '@angular/common';
import { Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent ,NgFor, NgIf ,SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})


export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  isSearchMode: boolean = false;
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.currentPage = 1;
      this.isSearchMode = !!this.searchQuery;
      this.fetchMovies();
    });
  }

  fetchMovies(): void {
    if (this.isSearchMode && this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe((data) => {
        this.processMovieData(data);
      });
    } else {
      this.movieService.getNowPlayingMovies(this.currentPage).subscribe((data) => {
        this.processMovieData(data);
      });
    }
  }

  processMovieData(data: any): void {
    this.movies = data.results.map((movie: any) => ({
      title: movie.title,
      releaseDate: movie.release_date,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      id: movie.id,
      isFavorite: this.movieService.isMovieInWatchlist(movie.id)
    }));
    this.totalPages = data.total_pages;
    this.generatePageNumbers();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchMovies();
    }
  }

  generatePageNumbers(): void {
    this.pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }
}
