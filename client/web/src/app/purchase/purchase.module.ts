import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from '../purchase/purchase.component';
import { PurchaseModalAddItemComponent } from '../shared/modals/client-modal-add-item/client-modal-add-item.component';
import { PurchaseModalEditItemComponent } from '../shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { PurchaseModalAddInquiryComponent } from '../shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { PurchaseModalAddOfferComponent } from '../shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from '../shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditOfferComponent } from '../shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { PurchaseModalEditOrderComponent } from '../shared/modals/client-modal-edit-order/client-modal-edit-order.component';
import { PurchaseModalEditInquiryComponent } from '../shared/modals/client-modal-edit-inquiry/client-modal-edit-inquiry.component';



@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseModalAddItemComponent,
    PurchaseModalEditItemComponent,
    PurchaseModalAddInquiryComponent,
    PurchaseModalAddOfferComponent,
    PurchaseModalAddOrderComponent,
    PurchaseModalEditOfferComponent,
    PurchaseModalEditOrderComponent,
    PurchaseModalEditInquiryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PurchaseRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    PurchaseModalAddItemComponent,
    PurchaseModalEditItemComponent,
    PurchaseModalAddInquiryComponent,
    PurchaseModalAddOfferComponent,
    PurchaseModalAddOrderComponent,
    PurchaseModalEditOfferComponent,
    PurchaseModalEditOrderComponent
  ]
})
export class PurchaseModule { }
