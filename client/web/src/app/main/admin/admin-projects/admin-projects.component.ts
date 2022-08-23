import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColDef } from "ag-grid-community";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "@shared/api/api.service";
import { IProject } from "@shared/models";
import { AdminModalAddProjectComponent } from "@admin/admin-modals/admin-modal-add-project/admin-modal-add-project.component";
import { AdminModalEditProjectComponent } from "@admin/admin-modals/admin-modal-edit-project/admin-modal-edit-project.component";

@Component({
  selector: "app-admin-projects",
  templateUrl: "./admin-projects.component.html",
  styleUrls: ["./admin-projects.component.scss"],
})
export class AdminProjectsComponent implements OnInit {
  public columnDefs: ColDef[] = [];
  public grid: any = {};
  public pageSize: number = 1000;

  constructor(private api: ApiService, private modalService: NgbModal, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getProjectsData();
  }

  public getProjectsData(): void {
    this.spinner.show();
    this.api.project.getProjects({}, 1, this.pageSize).subscribe((response) => {
      this.grid = response;
      this.spinner.hide();
    });
    this.columnDefs = [
      { checkboxSelection: true, flex: 0.5, headerCheckboxSelection: true },
      { field: "id", headerName: "id", sortable: true, filter: true, resizable: true, flex: 1, sort: "desc" },
      { field: "name", headerName: "Nazwa", sortable: true, filter: true, resizable: true, flex: 3 },
      { field: "client.name", headerName: "Klient", sortable: true, filter: true, resizable: true, flex: 3 },
    ];
  }

  public openAddProjectModal(): void {
    const modalRef = this.modalService.open(AdminModalAddProjectComponent);
    modalRef.componentInstance.projectAddedEvent.subscribe(() => this.getProjectsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }

  public openEditProjectModal(project: IProject): void {
    const modalRef = this.modalService.open(AdminModalEditProjectComponent);
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.projectEditedEvent.subscribe(() => this.getProjectsData());
    modalRef.componentInstance.closeEvent.subscribe(() => this.modalService.dismissAll());
  }
}
