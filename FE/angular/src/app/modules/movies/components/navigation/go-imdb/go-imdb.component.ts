import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-go-imdb',
  templateUrl: './go-imdb.component.html'
})
export class GoImdbComponent {
  @Input() public imdbId: string;
  @Output() public goToImdb = new EventEmitter<string>();
}
