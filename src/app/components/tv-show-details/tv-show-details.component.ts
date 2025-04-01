import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from '../../services/tv-show.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {
  tvShow: any;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(private route: ActivatedRoute, private tvShowService: TvShowService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tvShowService.getTvShowDetails(+id).subscribe((data: any) => {
        this.tvShow = data;
      });
    }
  }
}
