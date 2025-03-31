import { NgClass, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule

@Component({
  selector: 'app-watchlist',
  imports: [NgFor , NgClass ,SlicePipe ,RouterLink] ,
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  movies = [
  ];
  faHeartCrack = faHeartCrack;
}
