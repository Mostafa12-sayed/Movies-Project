import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,TranslatePipe ,UpperCasePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    count: number = 0;
    private watchlistSubscription!: Subscription;
    currentLang : string = 'en'; // اللغة الافتراضية


    constructor(private movieService: MovieService ,public  translate: TranslateService,    private cdr: ChangeDetectorRef, 
        private zone: NgZone ) {
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        this.translate.use(savedLang);
        // this.translate.setDefaultLang('en'); // تعيين اللغة الافتراضية

    }

    ngOnInit(): void {
        this.count = this.movieService.getWatchlist()?.length ?? 0; // Handle null/undefined
        this.watchlistSubscription = this.movieService.watchlistChanges?.subscribe(() => {
            this.count = this.movieService.getWatchlist()?.length ?? 0; // Handle null/undefined
        }) ?? new Subscription(); // Fallback to an empty subscription if null

        
    }

    ngOnDestroy(): void {
        this.watchlistSubscription?.unsubscribe(); // Use optional chaining
    }

    changeLanguage(lang: string) {
        this.zone.run(() => {
          this.translate.use(lang);
          localStorage.setItem('selectedLanguage', lang);
          this.cdr.detectChanges(); // إجبار التحديث اليدوي
        });
      }

}
