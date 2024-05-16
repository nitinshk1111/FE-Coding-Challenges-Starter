import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MovieComplete } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ]
})
export class MovieTileComponent {
  @Input() movie: MovieComplete;
  @Input() showDetails = false;

  @Output() public goToImdb = new EventEmitter<string>();
  @Output() public goToDetails = new EventEmitter<string>();
}
