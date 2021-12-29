import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-shared/api/api.service';
import { IItemToOrder } from '../client-shared/models/models';



@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true, resizable: true, editable: true},
    { field: 'name', sortable: true, filter: true, resizable: true },
    { field: 'quantity', sortable: true, filter: true, resizable: true },
    { field: 'status', sortable: true, filter: true, resizable: true },
    { field: 'idProject', sortable: true, filter: true, resizable: true },
    { field: 'idDistributor', sortable: true, filter: true, resizable: true }
  ];
  public rowData: IItemToOrder[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getItemsData()
  }


  private getItemsData(): void {
    this.api.getItemsToOrder().subscribe((response) => this.rowData = response);
  }



}
