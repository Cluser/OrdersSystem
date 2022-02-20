import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/purchase/items', pathMatch: 'full' },
  {
    path: 'purchase',
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule)
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