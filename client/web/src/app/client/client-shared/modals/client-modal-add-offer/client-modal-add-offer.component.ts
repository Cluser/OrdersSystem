import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../api/api.service';
import { IDistributor, IOfferCreate} from '../../models';

@Component({
  selector: 'app-client-modal-add-offer',
  templateUrl: './client-modal-add-offer.component.html',
  styleUrls: ['./client-modal-add-offer.component.scss']
})
export class ClientModalAddOfferComponent implements OnInit {

  @Output() offerAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  
  public offer: IOfferCreate = {};
  public items: any = [];
  public distributors: IDistributor[] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true},
      { field: 'project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    this.rowData = this.items;
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public addOffer(offer: IOfferCreate): void {
    offer.idUser = 1;
    this.api.offer.addOffer(offer).subscribe((offer: any) => {
      this.api.offerItem.addOfferItems(this.items, offer, 5, 5, 'sss').subscribe(() => {
        this.offerAddedEvent.emit();
        this.close();
      })
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
