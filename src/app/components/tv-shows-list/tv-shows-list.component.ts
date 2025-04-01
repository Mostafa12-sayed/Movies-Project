import { Component, OnInit } from '@angular/core';
import { TvShowCardComponent } from '../tv-show-card/tv-show-card.component'; 
import { TvShowService } from '../../services/tv-show.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-tv-shows-list',
  standalone: true,
  imports: [CommonModule, TvShowCardComponent],
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.css']
})
export class TvShowsListComponent implements OnInit {
  tvShows: any[] = [];

  constructor(private tvShowService: TvShowService) {}

  ngOnInit() {
    this.getTvShows();
  }

  getTvShows() {
    this.tvShowService.getTvShows().subscribe((data: any) => {
      this.tvShows = data.results;
    });
  }
}
