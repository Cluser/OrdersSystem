import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseInquiriesComponent } from './purchase-inquiries/purchase-inquiries.component';
import { PurchaseItemsComponent } from './purchase-items/purchase-items.component';
import { PurchaseOffersComponent } from './purchase-offers/purchase-offers.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    children: [
      { path: 'items', component: PurchaseItemsComponent },
      { path: 'inquiries', component: PurchaseInquiriesComponent },
      { path: 'offers', component: PurchaseOffersComponent },
      { path: 'orders', component: PurchaseOrdersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }