import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
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
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }