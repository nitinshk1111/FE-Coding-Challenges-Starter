import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  },
  {
    path: 'movies',
    loadChildren: () => import('./modules/movies/movies.module').then((m) => m.MoviesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
