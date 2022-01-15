import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientCenterComponent } from './client-center/client-center.component';
import { ClientMenuLeftComponent } from './client-menu-left/client-menu-left.component';
import { ClientMenuRightComponent } from './client-menu-right/client-menu-right.component';
import { ClientMenuLeftDetailsComponent } from './client-menu-left-details/client-menu-left-details.component';
import { ClientModalAddItemComponent } from './client-shared/modals/client-modal-add-item/client-modal-add-item.component';
import { ClientModalEditItemComponent } from './client-shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { ClientModalAddInquiryComponent } from './client-shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { ClientModalAddOfferComponent } from './client-shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { ClientModalAddOrderComponent } from './client-shared/modals/client-modal-add-order/client-modal-add-order.component';
import { ClientModalEditOfferComponent } from './client-shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { ClientModalEditOrderComponent } from './client-shared/modals/client-modal-edit-order/client-modal-edit-order.component';



@NgModule({
  declarations: [
    ClientComponent,
    ClientCenterComponent,
    ClientMenuLeftComponent,
    ClientMenuRightComponent,
    ClientMenuLeftDetailsComponent,
    ClientModalAddItemComponent,
    ClientModalEditItemComponent,
    ClientModalAddInquiryComponent,
    ClientModalAddOfferComponent,
    ClientModalAddOrderComponent,
    ClientModalEditOfferComponent,
    ClientModalEditOrderComponent
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
