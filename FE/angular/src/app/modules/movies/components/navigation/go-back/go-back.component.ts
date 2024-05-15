import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseLink } from '@shared/sidebar/sidebar.component';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {
  @Input() public links: BaseLink[];
  @Output() public navigateToBack = new EventEmitter<void>();
}
