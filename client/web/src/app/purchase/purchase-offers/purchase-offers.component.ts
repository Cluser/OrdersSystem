import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalAddOfferComponent } from 'src/app/shared/modals/client-modal-add-offer/client-modal-add-offer.component';
import { PurchaseModalAddOrderComponent } from 'src/app/shared/modals/client-modal-add-order/client-modal-add-order.component';
import { PurchaseModalEditOfferComponent } from 'src/app/shared/modals/client-modal-edit-offer/client-modal-edit-offer.component';
import { IOffer } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-offers',
  templateUrl: './purchase-offers.component.html',
  styleUrls: ['./purchase-offers.component.scss']
})
export class PurchaseOffersComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOffersData()
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

  private calculateOffersPrices(offers: any): void {
    offers.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price, 0) + ' zł')
  }

  public openAddOfferModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOfferComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    // modalRef.componentInstance.offerAddedEvent.subscribe(() => { this.getOffersData(); this.selectMenu("Offers") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openAddOrderModal(): void {
    const modalRef = this.modalService.open(PurchaseModalAddOrderComponent, {size: 'xl'});
    modalRef.componentInstance.items = this.selectedRows.flatMap((rows) => rows = rows.items)
    // modalRef.componentInstance.orderAddedEvent.subscribe(() => { this.getOrdersData(); this.selectMenu("Orders") });
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditOfferModal(offer: IOffer): void {
    const modalRef = this.modalService.open(PurchaseModalEditOfferComponent, {size: 'xl'});
    modalRef.componentInstance.offer = offer;
    modalRef.componentInstance.offerEdditedEvent.subscribe(() => this.getOffersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }
}