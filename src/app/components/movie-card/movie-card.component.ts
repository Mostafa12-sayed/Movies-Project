import { NgClass } from '@angular/common';
import { Component ,inject } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [NgClass ,RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie: any;

  private route = inject(ActivatedRoute);
  // ngOnInit() {
  //   console.log(this.movie);
  // }
    
  toggleFavorite() {
    this.movie.isFavorite = !this.movie.isFavorite;
  }
}
