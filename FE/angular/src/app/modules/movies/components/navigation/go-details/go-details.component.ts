import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-go-details',
  templateUrl: './go-details.component.html'
})
export class GoDetailsComponent {
  @Input() public imdbId: string;
  @Output() public goToDetails = new EventEmitter<string>();
}
