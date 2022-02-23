import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/api/authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main/purchase/items', pathMatch: 'prefix' },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard],
  },
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }