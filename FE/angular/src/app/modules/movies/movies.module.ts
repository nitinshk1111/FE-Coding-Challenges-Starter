import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { GoImdbComponent } from './components/navigation/go-imdb/go-imdb.component';
import { DecadesComponent } from './components/navigation/decades/decades.component';
import { MovieTileComponent } from './components/movie-tile/movie-tile.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { GoBackComponent } from './components/navigation/go-back/go-back.component';
import { GoDetailsComponent } from './components/navigation/go-details/go-details.component';
import { ImageFallbackUrlDirective } from '@shared/imageFallbackUrl.directive';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    GoBackComponent,
    MovieTileComponent,
    MoviesComponent,
    MovieComponent,
    GoDetailsComponent,
    GoImdbComponent,
    DecadesComponent
  ],
  imports: [
    CommonModule,
    ImageFallbackUrlDirective,
    SidebarComponent,
    RouterModule.forChild([
      {
        path: '',
        component: MoviesComponent
      },
      {
        path: 'movie/:id',
        component: MovieComponent
      }
    ])
  ]
})
export class MoviesModule {}
