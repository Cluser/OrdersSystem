import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../client-services/api/api.service';



@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.loadData();
  }

  columnDefs: ColDef[] = [
    { field: 'make', sortable: true, filter: true, resizable: true, editable: true},
    { field: 'model', sortable: true, filter: true, resizable: true },
    { field: 'price', sortable: true, filter: true, resizable: true }
  ];

  rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

}
