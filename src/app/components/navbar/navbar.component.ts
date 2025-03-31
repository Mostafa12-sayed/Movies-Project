import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

    count: number = 0;
    private watchlistSubscription!: Subscription;

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.count = this.movieService.getWatchlist().length;
        this.watchlistSubscription = this.movieService.watchlistChanges.subscribe(() => {
            this.count = this.movieService.getWatchlist().length;
        });
    }

    ngOnDestroy(): void {
        if (this.watchlistSubscription) {
            this.watchlistSubscription.unsubscribe();
        }
    }
}
