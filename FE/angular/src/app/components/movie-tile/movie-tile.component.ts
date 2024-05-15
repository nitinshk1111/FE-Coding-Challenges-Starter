import { Component, Input } from '@angular/core';
import { MovieComplete } from 'src/app/services/data.service';

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
}
