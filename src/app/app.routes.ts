import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movie-list/movie-list.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { TvShowsListComponent } from './components/tv-shows-list/tv-shows-list.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';

export const routes: Routes = [
    {
        path: '',
        component: MoviesListComponent,
        title: 'Home',
      },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    title: 'Move Details',
  },
  { 
    path: 'tv-shows', 
    component: TvShowsListComponent 
  },
  { 
    path: 'tv-show/:id', 
    component: TvShowDetailsComponent 
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    title: 'Watchlist',
  },
];
