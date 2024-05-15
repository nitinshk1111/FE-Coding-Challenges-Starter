import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, of } from 'rxjs';
import { DataService } from '../../../../services/data.service';
import { MovieComplete } from '../../interfaces/movie.interface';
import { IMDB_BASE_LINK } from '../../../../app.constant';
import { BaseLink } from '@shared/sidebar/sidebar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movieDetails$: Observable<MovieComplete | undefined>;
  public goBackLink: BaseLink[] = [
    {
      label: 'Go Back',
      isActive: true
    }
  ];

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private location: Location) {}

  public ngOnInit() {
    this.movieDetails$ = this.activatedRoute.params.pipe(
      concatMap(({ id }) => {
        const movieId = id as string;
        return this.dataService.movieDetails.get(movieId)
          ? of(this.dataService.movieDetails.get(movieId))
          : this.dataService.getMovie(movieId);
      })
    );
  }

  gotoImDb(id: string) {
    window.open(IMDB_BASE_LINK + id, 'imdbWindow');
  }

  navigateToBack() {
    this.location.back();
  }
}
