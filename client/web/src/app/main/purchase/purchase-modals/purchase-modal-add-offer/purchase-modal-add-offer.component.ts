import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../../../shared/api/api.service';
import { IContactPerson, IDistributor, IOffer, IOfferItem} from '../../../../shared/models';
import { currencyFormatter } from '../../../../shared/functions/formatters';

@Component({
  selector: 'app-purchase-modal-add-offer',
  templateUrl: './purchase-modal-add-offer.component.html',
  styleUrls: ['./purchase-modal-add-offer.component.scss']
})
export class PurchaseModalAddOfferComponent implements OnInit {
  

  @Output() offerAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000
  public selectedRows: any[] = [];
  
  public offer: IOffer = {};
  public items: any[] = [];
  public offerItems: IOfferItem[] = [];
  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];
  public currency: string = "PLN";

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
      { field: 'item.category.name', headerName: 'Category', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'quantity', headerName: 'Ilość', sortable: true, filter: true, resizable: true, flex: 1, editable: true, cellStyle: (params) => this.cellFormating(params) },
      { field: 'price', headerName: 'Cena', sortable: true, filter: true, resizable: true, flex: 3, editable: true, valueFormatter: (params) => currencyFormatter(params, this.currency), type: 'rightAligned' },
      { field: 'total',  headerName: 'Razem', sortable: true, valueGetter: 'getValue("price") * getValue("quantity")', valueFormatter: (params) => currencyFormatter(params, this.currency), type: 'rightAligned' },
      { field: 'item.project.name', headerName: 'Projekt', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'item.user.name', headerName: 'Zgłaszający', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
    // Deep copy of items - without reference
    this.rowData = JSON.parse(JSON.stringify(this.items));
  }

  public cellFormating(params: any) {
    // smthg wrong with re render
    switch(params.value){
      case null: return { backgroundColor: 'green' };
      case 2: return { backgroundColor: 'yellow' };
      default: return { backgroundColor: 'yellow' };
    }
  }

  public onCellEditingStopped(e: any): void {
    this.rowData[e.rowIndex] = e.data;
  }
  

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => {
      this.distributors = distributors.items
      this.getContactPersons(this.offer.idDistributor)
    });
  }

  public getContactPersons(idDistributor?: number): void {
    this.api.contactPerson.getContactPersons({idDistributor: idDistributor}, 1, 1000).subscribe((contactPersons) => this.contactPersons = contactPersons.items);
  }

  public addOffer(offer: IOffer): void {
    offer.idUser = 1;
    offer.archived = false;
    this.api.offer.addOffer(offer).subscribe((offer: any) => {

      this.selectedRows.forEach((row) => {
        let obj: IOfferItem = { Item_id: row.item.id, offer_id: offer.id, price: Number(row.price), quantity: Number(row.quantity), currency: this.currency }
        this.offerItems.push(obj)
      })

      this.api.offerItem.addOfferItems(this.offerItems).subscribe(() => {
        this.offerAddedEvent.emit();
        this.close();
      })
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

  public onSelectionChanged(selection: any): void {
    this.selectedRows = selection.api.getSelectedNodes().map((node: any) => node.data);
  }

}
