import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { PurchaseModalEditOrderComponent } from 'src/app/shared/modals/client-modal-edit-order/client-modal-edit-order.component';
import { IOrder } from 'src/app/shared/models';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  public filter: string = '';
  public selectedMenu: string = 'Items';
  public selectedRows: any[] = [];

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOrdersData()
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

  public openEditOrderModal(order: IOrder): void {
    const modalRef = this.modalService.open(PurchaseModalEditOrderComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.orderEdditedEvent.subscribe(() => this.getOrdersData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  private calculateOrdersPrices(orders: any): void {
    orders.forEach((offer: any) => offer.totalPrice = Object.values(offer.items).reduce((acc: any,cur: any) => acc + cur.price, 0) + ' zł')
  }

}