import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../../../../shared/api/api.service';
import { currencyFormatter } from '../../../../shared/functions/formatters';
import {
  IContactPerson,
  IDistributor,
  IOffer,
} from '../../../../shared/models';

@Component({
  selector: 'app-purchase-modal-edit-offer',
  templateUrl: './purchase-modal-edit-offer.component.html',
  styleUrls: ['./purchase-modal-edit-offer.component.scss'],
})
export class PurchaseModalEditOfferComponent implements OnInit {
  @Output() offerEdditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public columnDefs: ColDef[] = [];
  public rowData: any[] = [];
  public pageSize: number = 1000;

  public offer: any = {};
  public distributors: IDistributor[] = [];
  public contactPersons: IContactPerson[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.prepareGrid();
    this.getDistributors();
  }

  public prepareGrid(): void {
    this.columnDefs = [
      // { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      {
        field: 'item.id',
        headerName: 'id',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      {
        field: 'item.name',
        headerName: 'Nazwa',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: 'item.model',
        headerName: 'Model',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: 'item.category.name',
        headerName: 'Category',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
      },
      {
        field: 'quantity',
        headerName: 'Ilość',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        editable: true,
        type: 'rightAligned',
      },
      {
        field: 'price',
        headerName: 'Cena',
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
        editable: true,
        valueFormatter: (params) =>
          currencyFormatter(params, this.rowData[0].currency),
        type: 'rightAligned',
      },
      {
        field: 'total',
        headerName: 'Razem',
        sortable: true,
        valueGetter: 'getValue("price") * getValue("quantity")',
        valueFormatter: (params) =>
          currencyFormatter(params, this.rowData[0].currency),
        type: 'rightAligned',
      },
    ];
    this.rowData = this.offer.items;
  }

  public getDistributors(): void {
    this.api.distributor
      .getDistributors({}, 1, 1000)
      .subscribe((distributors) => {
        this.distributors = distributors.items;
        this.getContactPersons(this.offer.idDistributor);
      });

    this.offer._totalPrice = this.offer.items.reduce((x: any, y: any) => {
      return x + y.price;
    }, 0);
  }

  public getContactPersons(idDistributor?: number): void {
    this.api.contactPerson
      .getContactPersons({ idDistributor: idDistributor }, 1, 1000)
      .subscribe(
        (contactPersons) => (this.contactPersons = contactPersons.items)
      );
  }

  public editOffer(offer: IOffer): void {
    this.api.offer.editOffer(offer).subscribe(() => {
      this.api.offerItem.editdOfferItem(this.offer.items).subscribe();
      this.offerEdditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
