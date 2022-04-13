import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColDef } from "ag-grid-community";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "src/app/shared/api/api.service";
import { IClient } from "src/app/shared/models";
import { AdminModalAddClientComponent } from "../admin-modals/admin-modal-add-client/admin-modal-add-client.component";
import { AdminModalEditClientComponent } from "../admin-modals/admin-modal-edit-client/admin-modal-edit-client.component";

@Component({
  selector: "app-admin-clients",
  templateUrl: "./admin-clients.component.html",
  styleUrls: ["./admin-clients.component.scss"],
})
export class AdminClientsComponent implements OnInit {
  public columnDefs: ColDef[] = [];
  public grid: any = {};
  public pageSize: number = 1000;

  constructor(private api: ApiService, private modalService: NgbModal, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getClientsData();
  }

  public getClientsData(): void {
    this.spinner.show();
    this.api.client.getClients({}, 1, this.pageSize).subscribe((response) => {
      this.grid = response;
      this.spinner.hide();
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: "id", headerName: "id", sortable: true, filter: true, resizable: true, flex: 1, sort: "desc" },
      { field: "name", headerName: "Nazwa", sortable: true, filter: true, resizable: true, flex: 3 },
      { field: "email", headerName: "E-mail", sortable: true, filter: true, resizable: true, flex: 3 },
      { field: "phone", headerName: "Telefon", sortable: true, filter: true, resizable: true, flex: 3 },
      { field: "address", headerName: "Adres", sortable: true, filter: true, resizable: true, flex: 3 },
      { field: "description", headerName: "Opis", sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddClientModal(): void {
    const modalRef = this.modalService.open(AdminModalAddClientComponent);
    modalRef.componentInstance.clientAddedEvent.subscribe(() => this.getClientsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditClientModal(client: IClient): void {
    const modalRef = this.modalService.open(AdminModalEditClientComponent);
    modalRef.componentInstance.client = client;
    modalRef.componentInstance.clientEditedEvent.subscribe(() => this.getClientsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }
}
