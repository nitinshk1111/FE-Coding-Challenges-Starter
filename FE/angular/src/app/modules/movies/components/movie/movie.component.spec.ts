import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { MovieComponent } from './movie.component';
import { of } from 'rxjs';
import { DataService } from '../../../../services/data.service';
import { MovieComplete } from '../../interfaces/movie.interface';
const mockMovieDetails: MovieComplete = {
  Title: 'Test Movie',
  Year: 2021,
  Rated: 'PG',
  Released: '01 Jan 2021',
  Runtime: '120 min',
  Genre: 'Action',
  Director: 'John Doe',
  Writer: 'Jane Doe',
  Actors: 'John Doe, Jane Doe',
  Plot: 'A movie about testing',
  imdbID: 'movieId',
  Poster: 'https://example.com/poster.jpg',
  Type: 'movie'
};
describe('MovieComponent', () => {
  let spectator: Spectator<MovieComponent>;
  let component: MovieComponent;
  const createComponent = createComponentFactory({
    component: MovieComponent,
    imports: [],
    declarations: [],
    providers: [
      DataService,
      {
        provide: ActivatedRoute,
        useValue: {
          params: of(convertToParamMap({ id: 123443 }))
        }
      },
      {
        provide: DataService,
        useValue: {
          getMovie: of(mockMovieDetails),
          movieDetails: new Map([[undefined, mockMovieDetails]])
        }
      }
    ],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  test('should create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('Show Movie details', () => {
    test('should fetch movie details and display them', () => {
      spectator.detectChanges();
      component.ngOnInit();
      component.movieDetails$.subscribe((movieDetails) => {
        expect(movieDetails).toEqual(mockMovieDetails);
      });
      expect(spectator.query('.movie')).toBeTruthy();
    });
  });

  describe('Show Movie details', () => {
    test('should fetch movie details and display them', () => {
      component.ngOnInit();
      const dataService = spectator.inject(DataService);

      spyOn(dataService, 'getMovie').and.returnValue(of(mockMovieDetails));
      spyOn(dataService, 'movieDetails').and.returnValue(new Map([[undefined, null]]));

      component.movieDetails$.subscribe((movieDetails) => {
        expect(movieDetails).toEqual(mockMovieDetails);
      });
      expect(spectator.query('.movie')).toBeNull();
    });
  });
});
