import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { DataService } from '../../../../services/data.service';
import { MovieComplete } from '../../interfaces/movie.interface';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  public decadeSelectionChanges$ = new BehaviorSubject<number>(0);
  public moviesAndDecadesData$: Observable<{
    decades: number[];
    filteredMovies: MovieComplete[];
  }>;

  constructor(private dataService: DataService, private navigationService: NavigationService) {}

  public ngOnInit(): void {
    this.moviesAndDecadesData$ = combineLatest([this.dataService.getMovies(), this.decadeSelectionChanges$]).pipe(
      map(([movieList, currentDecade]) => {
        return {
          decades: movieList.Decades,
          filteredMovies: this.dataService.getFilteredMovies(movieList.Search, currentDecade)
        };
      })
    );
  }

  navigateToDetails(id: string) {
    this.navigationService.goTo('/movies/movie', id);
  }
}
