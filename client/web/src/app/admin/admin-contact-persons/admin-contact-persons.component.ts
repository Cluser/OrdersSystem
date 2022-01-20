import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { IClient, IContactPerson } from 'src/app/shared/models';
import { AdminModalAddContactPersonComponent } from '../admin-modals/admin-modal-add-contact-person/admin-modal-add-contact-person.component';
import { AdminModalEditContactPersonComponent } from '../admin-modals/admin-modal-edit-contact-person/admin-modal-edit-contact-person.component';

@Component({
  selector: 'app-admin-contact-persons',
  templateUrl: './admin-contact-persons.component.html',
  styleUrls: ['./admin-contact-persons.component.scss']
})
export class AdminContactPersonsComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor(private api: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getContactPersonsData();
  }

  public getContactPersonsData(): void {
    this.api.contactPerson.getContactPersons({}, 1, this.pageSize).subscribe((response) => this.rowData = response.items);
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: 'id', headerName: 'id', sortable: true, filter: true, resizable: true, flex: 1 },
      { field: 'name', headerName: 'Nazwa', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'distributor.name', headerName: 'Dystrybutor', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'email', headerName: 'E-mail', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'phone', headerName: 'Telefon', sortable: true, filter: true, resizable: true, flex: 3 },
      { field: 'description', headerName: 'Opis', sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddContactPersonModal(): void {
    const modalRef = this.modalService.open(AdminModalAddContactPersonComponent);
    modalRef.componentInstance.contactPersonAddedEvent.subscribe(() => this.getContactPersonsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  
  public openEditContactPersonModal(contactPerson: IContactPerson): void {
    const modalRef = this.modalService.open(AdminModalEditContactPersonComponent);
    modalRef.componentInstance.contactPerson = contactPerson;
    modalRef.componentInstance.contactPersonEditedEvent.subscribe(() => this.getContactPersonsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

}
