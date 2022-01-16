import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../shared/api/api.service';
import { IInquiry, IItem, IOffer, IOrder } from '../shared/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseModalAddItemComponent } from '../shared/modals/client-modal-add-item/client-modal-add-item.component';
import { PurchaseModalEditItemComponent } from '../shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { PurchaseModalAddInquiryComponent } from '../shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { PurchaseModalAddOfferComponent } from '../shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from '../shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditOfferComponent } from '../shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { PurchaseModalEditOrderComponent } from '../shared/modals/client-modal-edit-order/client-modal-edit-order.component';
import { PurchaseModalEditInquiryComponent } from '../shared/modals/client-modal-edit-inquiry/client-modal-edit-inquiry.component';



@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];


  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.selectMenu('Items');
  }

  public selectMenu(menu: string) {
    this.selectedMenu = menu;

    switch (this.selectedMenu) {
      case 'Items':
        this.getItemsData();
        break;
      case 'Inquiries':
        this.getInquiriesData();
        break;
      case 'Offers':
        this.getOffersData();
        break;
      case 'Orders':
        this.getOrdersData();
        break;

    }
  }

  public getItemsData(): void {
    this.api.item.getItems({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'category', headerName: 'Kategoria', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' }
    ];
  }

  public getInquiriesData(): void {
    this.api.inquiry.getInquiries({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },

    ];
  }

  public getOffersData(): void {
    this.api.offer.getOffers({}, 1, this.pageSize).subscribe((response) => {
      this.rowData = response.items
      this.calculateOffersPrices(this.rowData)
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },
      { field: 'totalPrice', headerName: 'Kwota', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },
    ];
  }

  public getOrdersData(): void {
    this.api.order.getOrders({}, 1, this.pageSize).subscribe((response) => {
      this.rowData = response.items
      this.calculateOrdersPrices(this.rowData)
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },
      { field: 'totalPrice', headerName: 'Kwota', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },
    ];
  }


  private calculateOffersPrices(offers: any): void {
    offers.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price, 0) + ' zł')
  }

  private calculateOrdersPrices(orders: any): void {
    orders.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price, 0) + ' zł')
  }

  public search(filter: any): void {
    if (filter) {this.api.item.getItems({'name': filter}, 1, 1000).subscribe((response) => this.rowData = response.items);} else
                {this.api.item.getItems().subscribe((response) => this.rowData = response.items);}
  }

  openAddItemModal() {
    const modalRef = this.modalService.open(PurchaseModalAddItemComponent);
    modalRef.componentInstance.itemAddedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddInquiryItemModal() {
    const modalRef = this.modalService.open(PurchaseModalAddInquiryComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.inquiryAddedEvent.subscribe(() => { this.getInquiriesData(); this.selectMenu("Inquiries") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOfferItemModal() {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.offerAddedEvent.subscribe(() => { this.getOffersData(); this.selectMenu("Offers") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOrderItemModal() {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.orderAddedEvent.subscribe(() => { this.getOrdersData(); this.selectMenu("Orders") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddInquiryModal() {
    const modalRef = this.modalService.open(PurchaseModalAddInquiryComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    modalRef.componentInstance.inquiryAddedEvent.subscribe(() => { this.getInquiriesData(); this.selectMenu("Inquiries") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOfferModal() {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    modalRef.componentInstance.offerAddedEvent.subscribe(() => { this.getOffersData(); this.selectMenu("Offers") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOrderModal() {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    modalRef.componentInstance.orderAddedEvent.subscribe(() => { this.getOrdersData(); this.selectMenu("Orders") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditItemModal(item: IItem) {
    const modalRef = this.modalService.open(PurchaseModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEditedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditInquiryModal(order: IInquiry) {
    const modalRef = this.modalService.open(PurchaseModalEditInquiryComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderEdditedEvent.subscribe(() => this.getOrdersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditOfferModal(offer: IOffer) {
    const modalRef = this.modalService.open(PurchaseModalEditOfferComponent, {size: 'xl'});
    modalRef.componentInstance.offer = offer;
    modalRef.componentInstance.offerEdditedEvent.subscribe(() => this.getOffersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditOrderModal(order: IOrder) {
    const modalRef = this.modalService.open(PurchaseModalEditOrderComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderEdditedEvent.subscribe(() => this.getOrdersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }


  onSelectionChanged(selection: any) {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

}
