import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { POSTER_URL, REPLACE_POSTER_URL, SERVICE_URL } from '../app.constant';

interface SearchResults {
  Response: string;
  Search: Movie[];
  totalResults: string;
}

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string | number;
}

interface MovieDetails extends Movie {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Writer: string;
}

export interface MovieComplete extends MovieDetails {
  Year: number;
}

export interface MovieData {
  Decades: number[];
  Search: MovieComplete[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private decades: number[] = [];
  private storedMovies: MovieData = { Search: [], Decades: [] };
  public movieDetails = new Map<string, MovieComplete>();

  constructor(private http: HttpClient) {}

  public getFilteredMovies(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${SERVICE_URL}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: Poster.replace(POSTER_URL, REPLACE_POSTER_URL),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        Year: parseInt(Year as string)
      })),
      tap((movie) => {
        this.movieDetails.set(id, movie);
      })
    );
  }

  public getMovies(): Observable<MovieData> {
    if (this.storedMovies && this.storedMovies.Search.length) {
      return of(this.storedMovies);
    }

    return this.http.get<SearchResults>(`${SERVICE_URL}s=Batman&type=movie`).pipe(
      tap(({ Search }) => {
        Search.forEach(({ Year }) => {
          // add decade to decades
          const decade = Math.ceil(parseInt(Year as string) / 10) * 10 - 10;
          if (this.decades.indexOf(decade) < 0) {
            this.decades.push(decade);
          }
        });
      }),
      mergeMap(({ Search }) => {
        return forkJoin(Search.map(({ imdbID }) => this.getMovie(imdbID)));
      }),
      map((Search) => {
        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);
        this.decades.sort((a, b) => a - b);
        this.storedMovies = { Search, Decades: this.decades };

        return this.storedMovies;
      })
    );
  }
}
