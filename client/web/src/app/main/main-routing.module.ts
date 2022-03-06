import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '../shared/api/authentication/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
        {
            path: 'purchase',
            loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule), canActivate: [AuthGuard]
        },
        {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]
        },
        {
            path: 'statistic',
            loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule), canActivate: [AuthGuard]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }