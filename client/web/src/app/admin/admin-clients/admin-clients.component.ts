import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.scss']
})
export class AdminClientsComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClientsData();
  }

  public getClientsData(): void {
    this.api.client.getClients({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'email', headerName: 'E-mail', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'phone', headerName: 'Telefon', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'address', headerName: 'Adres', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'description', headerName: 'Opis', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

}
