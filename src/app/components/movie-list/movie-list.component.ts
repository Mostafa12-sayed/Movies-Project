import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgFor, NgIf } from '@angular/common';
import { Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent ,NgFor ,SearchBarComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
 

export class MoviesListComponent implements OnInit {
  // movies: any[] = [];

  // constructor(private movieService: MovieService) {}

  // ngOnInit(): void {
  //   this.generatePages();

  //   this.movieService.getNowPlayingMovies().subscribe((data) => {
  //     this.movies = data.results.map((movie: any) => ({
  //       title: movie.title,
  //       releaseDate: movie.release_date,
  //       image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  //       rating: movie.vote_average,
  //       isFavorite: false
  //     }));
  //   });
  // }



  // @Input() totalPages: number = 5;
  // currentPage: number = 1;
  // pages: number[] = [];

 

  // generatePages() {
  //   this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  // }

  // goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getNowPlayingMovies(this.currentPage).subscribe((data) => {
      this.movies = data.results.map((movie: any) => ({
        title: movie.title,
        releaseDate: movie.release_date,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
        id: movie.id,

      }));
      this.totalPages = data.total_pages;
      this.generatePageNumbers();
    });
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
