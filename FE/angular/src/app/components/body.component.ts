import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  template: `<h2 class="font-bold text-3xl">Welcome to Movie list world</h2>
    <p>Here you can find all the movies you want to watch</p>
    <p>Enjoy by clicking the button</p>
    <button (click)="navigateToMovies()" class="movies-btn">Movies</button> `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .movies-btn {
        padding: 10px 30px;
        border-radius: 5px;
        background-color: green;
        color: white;
        cursor: pointer;
        border: none;
      }
    `
  ]
})
export class BodyComponent {
  constructor(private router: Router) {}

  navigateToMovies() {
    this.router.navigate(['/movies']);
  }
}
