import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverlapComponent } from './rectangle/overlap/overlap.component';


const routes: Routes = [
  {path: '', component: OverlapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
