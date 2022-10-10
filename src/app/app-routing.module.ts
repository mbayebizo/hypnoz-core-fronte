import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PagesComponent} from "./pages/pages.component";

const routes: Routes = [
  {path:'',component:PagesComponent},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
     useHash: true,
    enableTracing:true,

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
