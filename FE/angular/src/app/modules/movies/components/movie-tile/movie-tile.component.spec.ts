import { GoDetailsComponent } from '../navigation/go-details/go-details.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GoImdbComponent } from '../navigation/go-imdb/go-imdb.component';
import { MovieTileComponent } from './movie-tile.component';

describe('MovieCardComponent', () => {
  let spectator: Spectator<MovieTileComponent>;
  let component: MovieTileComponent;
  const mockMovies = {
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
  };

  const createComponent = createComponentFactory({
    component: MovieTileComponent,
    imports: [],
    declarations: [GoImdbComponent, GoDetailsComponent],
    providers: [],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        movie: mockMovies,
        showDetails: false
      }
    });
    component = spectator.component;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should set movie Title to "Mock Movie"', () => {
    spectator.detectChanges();
    const element = spectator.query('.title');
    expect(element?.textContent).toContain(mockMovies.Title);
  });

  test('should set isMovieDetails to false', () => {
    expect(component.showDetails).toBeFalsy();
  });
});
