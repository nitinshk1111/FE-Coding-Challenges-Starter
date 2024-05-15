import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MoviesComponent } from './movies.component';
import { DataService, MovieComplete } from '../../services/data.service';
import { of } from 'rxjs';

const mockMovies = [
  {
    Title: 'Mock Movie',
    Year: 2000,
    Rated: 'G',
    Released: '01 Jan 2000',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  },
  {
    Title: 'Mock Movie 2',
    Year: 2011,
    Rated: 'G',
    Released: '01 Jan 2011',
    Runtime: '90 min',
    Genre: 'Mock Genre',
    Director: 'Director McMock',
    Writer: 'Writer Mock, Writer Mockerson',
    Actors: 'Actor McMock, Actor Mockerson',
    Plot: 'Mock movie plot summary.',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    imdbID: 'tt123',
    Type: 'movie'
  }
];

describe('MoviesComponent', () => {
  let spectator: Spectator<MoviesComponent>;
  let component: MoviesComponent;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [],
    declarations: [],
    shallow: true,
    detectChanges: false,
    providers: [
      {
        provide: DataService,
        useValue: {
          getMovies: () => of({ Decades: [1990, 2000, 2010], Search: mockMovies }),
          getFilteredMovies: (movies: MovieComplete[], decade: number) =>
            movies.filter((movie) => movie.Year >= decade && movie.Year < decade + 10)
        }
      }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('filtered movies', () => {
    test('should filter movies by decade', () => {
      spectator.component.decadeSelectionChanges$.next(2000);
      spectator.detectChanges();
      let filterMovies = [];
      component.moviesAndDecadesData$.subscribe((data) => (filterMovies = data.filteredMovies));
      expect(filterMovies.length).toBe(1);
      expect(spectator.queryAll('.movies li').length).toBe(1);
    });
  });

  describe('displayDecades', () => {
    test('should display decades', () => {
      let decades = [];
      spectator.detectChanges();
      component.moviesAndDecadesData$.subscribe((data) => (decades = data.decades));
      expect(decades.length).toBe(3);
    });
  });

  describe('WHEN movies are undefined', () => {
    test('should not display movies if there are no filtered movies', () => {
      const dataService = spectator.inject(DataService);
      spyOn(dataService, 'getFilteredMovies').and.returnValue([]);
      spectator.component.decadeSelectionChanges$.next(3000);
      spectator.detectChanges();
      expect(spectator.query('.movies')).toBeNull();
    });
  });
});
