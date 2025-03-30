import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movie-list/movie-list.component';

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
];
