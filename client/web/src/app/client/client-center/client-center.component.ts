import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-shared/api/api.service';
import { IItem, IOffer, IOrder } from '../client-shared/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalAddItemComponent } from '../client-shared/modals/client-modal-add-item/client-modal-add-item.component';
import { ClientModalEditItemComponent } from '../client-shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { ClientModalAddInquiryComponent } from '../client-shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { ClientModalAddOfferComponent } from '../client-shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { ClientModalAddOrderComponent } from '../client-shared/modals/client-modal-add-order/client-modal-add-order.component';
import { ClientModalEditOfferComponent } from '../client-shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { ClientModalEditOrderComponent } from '../client-shared/modals/client-modal-edit-order/client-modal-edit-order.component';



@Component({
  selector: 'app-client-center',
  templateUrl: './client-center.component.html',
  styleUrls: ['./client-center.component.scss']
})
export class ClientCenterComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];


  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsData();
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
    this.api.order.getOrders({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Użytkownik', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'dateAndTime', headerName: 'Data', sortable: true, filter: true, resizable: true, flex: 3, sort: 'desc' },
    ];
  }


  private calculateOffersPrices(offers: any): void {
    offers.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price, 0) + ' zł')
  }

  public search(filter: any): void {
    if (filter) {this.api.item.getItems({'name': filter}, 1, 1000).subscribe((response) => this.rowData = response.items);} else
                {this.api.item.getItems().subscribe((response) => this.rowData = response.items);}
  }

  openAddItemModal() {
    const modalRef = this.modalService.open(ClientModalAddItemComponent);
    modalRef.componentInstance.itemAddedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddInquiryModal() {
    const modalRef = this.modalService.open(ClientModalAddInquiryComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.inquiryAddedEvent.subscribe(() => { this.getInquiriesData(); this.selectMenu("Inquiries") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOfferModal() {
    const modalRef = this.modalService.open(ClientModalAddOfferComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    modalRef.componentInstance.offerAddedEvent.subscribe(() => { this.getOffersData(); this.selectMenu("Offers") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openAddOrderModal() {
    const modalRef = this.modalService.open(ClientModalAddOrderComponent, {size: 'xl'});
    // modalRef.componentInstance.items = this.selectedRows;
    
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    console.log(modalRef.componentInstance.items)
    modalRef.componentInstance.orderAddedEvent.subscribe(() => { this.getOrdersData(); this.selectMenu("Orders") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditItemModal(item: IItem) {
    const modalRef = this.modalService.open(ClientModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEditedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditOfferModal(offer: IOffer) {
    const modalRef = this.modalService.open(ClientModalEditOfferComponent, {size: 'xl'});
    modalRef.componentInstance.offer = offer;
    modalRef.componentInstance.offerEdditedEvent.subscribe(() => this.getOffersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  openEditOrderModal(order: IOrder) {
    const modalRef = this.modalService.open(ClientModalEditOrderComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderEdditedEvent.subscribe(() => this.getOrdersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }


  onSelectionChanged(selection: any) {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

}
