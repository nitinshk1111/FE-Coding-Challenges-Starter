import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, of } from 'rxjs';
import { DataService, MovieComplete } from '../../services/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  public movieDetails$: Observable<MovieComplete | undefined>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {}

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
}
