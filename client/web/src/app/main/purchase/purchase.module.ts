import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AgGridModule } from "ag-grid-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxDropzoneModule } from "ngx-dropzone";

import { PurchaseRoutingModule } from "@purchase/purchase-routing.module";
import { PurchaseComponent } from "@purchase/purchase.component";
import { PurchaseModalAddItemComponent } from "@purchase/purchase-modals/purchase-modal-add-item/purchase-modal-add-item.component";
import { PurchaseModalEditItemComponent } from "@purchase/purchase-modals/purchase-modal-edit-item/purchase-modal-edit-item.component";
import { PurchaseModalAddInquiryComponent } from "@purchase/purchase-modals/purchase-modal-add-inquiry/purchase-modal-add-inquiry.component";
import { PurchaseModalAddOfferComponent } from "@purchase/purchase-modals/purchase-modal-add-offer/purchase-modal-add-offer.component";
import { PurchaseModalAddOrderComponent } from "@purchase/purchase-modals/purchase-modal-add-order/purchase-modal-add-order.component";
import { PurchaseModalEditOfferComponent } from "@purchase/purchase-modals/purchase-modal-edit-offer/purchaset-modal-edit-offer.component";
import { PurchaseModalEditOrderComponent } from "@purchase/purchase-modals/purchase-modal-edit-order/purchase-modal-edit-order.component";
import { PurchaseModalEditInquiryComponent } from "@purchase/purchase-modals/purchase-modal-edit-inquiry/purchase-modal-edit-inquiry.component";
import { PurchaseInquiriesComponent } from "@purchase/purchase-inquiries/purchase-inquiries.component";
import { PurchaseMenuComponent } from "@purchase/purchase-menu/purchase-menu.component";
import { PurchaseOrdersComponent } from "@purchase/purchase-orders/purchase-orders.component";
import { PurchaseOffersComponent } from "@purchase/purchase-offers/purchase-offers.component";
import { PurchaseItemsComponent } from "@purchase/purchase-items/purchase-items.component";
import { PurchaseItemsSearchComponent } from "@purchase/purchase-items/purchase-items-search/purchase-items-search.component";
import { PurchaseInquiriesSearchComponent } from "@purchase/purchase-inquiries/purchase-inquiries-search/purchase-inquiries-search.component";
import { PurchaseOffersSearchComponent } from "@purchase/purchase-offers/purchase-offers-search/purchase-offers-search.component";
import { PurchaseOrdersSearchComponent } from "@purchase/purchase-orders/purchase-orders-search/purchase-orders-search.component";
import { PurchaseModalImportItemsComponent } from "@purchase/purchase-modals/purchase-modal-import-items/purchase-modal-import-items.component";
import { PurchaseModalArchiveComponent } from "@purchase/purchase-modals/purchase-modal-archive/purchase-modal-archive.component";

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
    PurchaseModalEditInquiryComponent,
    PurchaseInquiriesComponent,
    PurchaseMenuComponent,
    PurchaseOrdersComponent,
    PurchaseOffersComponent,
    PurchaseItemsComponent,
    PurchaseItemsSearchComponent,
    PurchaseInquiriesSearchComponent,
    PurchaseOffersSearchComponent,
    PurchaseOrdersSearchComponent,
    PurchaseModalImportItemsComponent,
    PurchaseModalArchiveComponent,
  ],
  imports: [CommonModule, FormsModule, PurchaseRoutingModule, AgGridModule.withComponents([]), NgxSpinnerModule, FontAwesomeModule, NgxDropzoneModule],
  entryComponents: [
    PurchaseModalAddItemComponent,
    PurchaseModalEditItemComponent,
    PurchaseModalAddInquiryComponent,
    PurchaseModalAddOfferComponent,
    PurchaseModalAddOrderComponent,
    PurchaseModalEditOfferComponent,
    PurchaseModalEditOrderComponent,
    PurchaseModalImportItemsComponent,
    PurchaseModalArchiveComponent,
  ],
})
export class PurchaseModule {}
