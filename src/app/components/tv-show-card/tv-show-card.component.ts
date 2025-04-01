import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TvShowService } from '../../services/tv-show.service'; 

@Component({
  selector: 'app-tv-show-card',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './tv-show-card.component.html',
  styleUrls: ['./tv-show-card.component.css'],
})
export class TvShowCardComponent {
  @Input() tvShow: any;

  private route = inject(ActivatedRoute);
  constructor(private tvShowService: TvShowService) {}

  toggleFavorite(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }



    console.log(this.tvShow.isFavorite);
  }
}
