import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientPurchaseComponent } from './client-purchase/client-purchase.component';
import { ClientMenuLeftComponent } from './client-menu-left/client-menu-left.component';
import { ClientModalAddItemComponent } from './client-shared/modals/client-modal-add-item/client-modal-add-item.component';
import { ClientModalEditItemComponent } from './client-shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { ClientModalAddInquiryComponent } from './client-shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { ClientModalAddOfferComponent } from './client-shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { ClientModalAddOrderComponent } from './client-shared/modals/client-modal-add-order/client-modal-add-order.component';
import { ClientModalEditOfferComponent } from './client-shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { ClientModalEditOrderComponent } from './client-shared/modals/client-modal-edit-order/client-modal-edit-order.component';
import { ClientModalEditInquiryComponent } from './client-shared/modals/client-modal-edit-inquiry/client-modal-edit-inquiry.component';



@NgModule({
  declarations: [
    ClientComponent,
    ClientPurchaseComponent,
    ClientMenuLeftComponent,
    ClientModalAddItemComponent,
    ClientModalEditItemComponent,
    ClientModalAddInquiryComponent,
    ClientModalAddOfferComponent,
    ClientModalAddOrderComponent,
    ClientModalEditOfferComponent,
    ClientModalEditOrderComponent,
    ClientModalEditInquiryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    ClientModalAddItemComponent,
    ClientModalEditItemComponent,
    ClientModalAddInquiryComponent,
    ClientModalAddOfferComponent,
    ClientModalAddOrderComponent,
    ClientModalEditOfferComponent,
    ClientModalEditOrderComponent
  ]
})
export class ClientModule { }
