import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private router: Router, private movieService: MovieService) {}

  search(): void {
    if (this.searchQuery.trim()) {
      this.movieService.setSearchQuery(this.searchQuery);
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery } });
    }

  }
}
