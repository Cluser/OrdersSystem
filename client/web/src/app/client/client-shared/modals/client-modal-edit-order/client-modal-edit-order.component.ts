import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IDistributor, IOfferCreate, IOrderCreate } from '../../models';

@Component({
  selector: 'app-client-modal-edit-order',
  templateUrl: './client-modal-edit-order.component.html',
  styleUrls: ['./client-modal-edit-order.component.scss']
})
export class ClientModalEditOrderComponent implements OnInit {
  
  @Output() orderEdditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public order: any = {};
  public distributors: IDistributor[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'item.id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'item.name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'price', headerName: 'Cena', sortable: true, filter: true, resizable: true, flex: 3, editable: true },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    this.rowData = this.order.items;
    console.log(this.rowData)
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);

    this.order._totalPrice = this.order.items.reduce((x: any, y: any) => { return x + y.price }, 0);

    console.log('Total Messages:', this.order._totalPrice); 
  }

  public addOrder(order: IOrderCreate): void {
    // offer.idUser = 1;
    // this.api.offer.addOffer(offer).subscribe((offer: any) => {
    //   this.api.offerItem.addOfferItems(this.items, offer, 5, 5, 'sss').subscribe(() => {
    //     this.offerEdditedEvent.emit();
    //     this.close();
    //   })
    // });
  }

  public close(): void {
    console.log(this.rowData)
    this.closeEvent.emit();
  }

}
