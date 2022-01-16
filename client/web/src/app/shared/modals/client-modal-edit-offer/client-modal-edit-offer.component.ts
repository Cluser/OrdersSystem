import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IDistributor, IOffer, IOfferCreate } from '../../models';

@Component({
  selector: 'app-client-modal-edit-offer',
  templateUrl: './client-modal-edit-offer.component.html',
  styleUrls: ['./client-modal-edit-offer.component.scss']
})
export class PurchaseModalEditOfferComponent implements OnInit {
  
  @Output() offerEdditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public offer: any = {};
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
      { field: 'item.model', headerName: 'Model', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'price', headerName: 'Cena', sortable: true, filter: true, resizable: true, flex: 3, editable: true },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'status', headerName: 'Status', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    this.rowData = this.offer.items;
    console.log(this.rowData)
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);

    this.offer._totalPrice = this.offer.items.reduce((x: any, y: any) => { return x + y.price }, 0);

    console.log('Total Messages:', this.offer._totalPrice); 
  }

  public addOffer(offer: IOfferCreate): void {
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
