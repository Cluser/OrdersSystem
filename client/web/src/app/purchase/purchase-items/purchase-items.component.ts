import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalAddInquiryComponent } from 'src/app/shared/modals/client-modal-add-inquiry/client-modal-add-inquiry.component';
import { PurchaseModalAddItemComponent } from 'src/app/shared/modals/client-modal-add-item/client-modal-add-item.component';
import { PurchaseModalAddOfferComponent } from 'src/app/shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from 'src/app/shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditItemComponent } from 'src/app/shared/modals/client-modal-edit-item/client-modal-edit-item.component';
import { IItem } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-items',
  templateUrl: './purchase-items.component.html',
  styleUrls: ['./purchase-items.component.scss']
})
export class PurchaseItemsComponent implements OnInit {
  
  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItemsData()
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

  public openAddItemModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddItemComponent);
    modalRef.componentInstance.itemAddedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddInquiryModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddInquiryComponent, {size: 'xl'});
    console.log(this.selectedRows)
    modalRef.componentInstance.items = this.selectedRows;
    console.log(modalRef.componentInstance.items)
    // modalRef.componentInstance.inquiryAddedEvent.subscribe(() => { this.getInquiriesData(); this.selectMenu("Inquiries") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    // modalRef.componentInstance.offerAddedEvent.subscribe(() => { this.getOffersData(); this.selectMenu("Offers") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows;
    // modalRef.componentInstance.orderAddedEvent.subscribe(() => { this.getOrdersData(); this.selectMenu("Orders") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditItemModal(item: IItem): void {
    const modalRef = this.modalService.open(PurchaseModalEditItemComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.itemEditedEvent.subscribe(() => this.getItemsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public search(filter: any): void {
    if (filter) {this.api.item.getItems({'name': filter}, 1, 1000).subscribe((response) => this.rowData = response.items);} else
                {this.api.item.getItems().subscribe((response) => this.rowData = response.items);}
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }
  
}
