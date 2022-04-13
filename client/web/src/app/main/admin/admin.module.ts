import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { NgxSpinnerModule } from "ngx-spinner";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminMenuComponent } from "./admin-menu/admin-menu.component";
import { AdminComponent } from "./admin.component";
import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { AdminDistributorsComponent } from "./admin-distributors/admin-distributors.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminClientsComponent } from "./admin-clients/admin-clients.component";
import { AdminModalAddProjectComponent } from "./admin-modals/admin-modal-add-project/admin-modal-add-project.component";
import { AdminModalAddClientComponent } from "./admin-modals/admin-modal-add-client/admin-modal-add-client.component";
import { AdminModalAddDistributorComponent } from "./admin-modals/admin-modal-add-distributor/admin-modal-add-distributor.component";
import { AdminModalEditProjectComponent } from "./admin-modals/admin-modal-edit-project/admin-modal-edit-project.component";
import { AdminModalEditDistributorComponent } from "./admin-modals/admin-modal-edit-distributor/admin-modal-edit-distributor.component";
import { AdminModalEditClientComponent } from "./admin-modals/admin-modal-edit-client/admin-modal-edit-client.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminModalAddCategoryComponent } from "./admin-modals/admin-modal-add-category/admin-modal-add-category.component";
import { AdminModalEditCategoryComponent } from "./admin-modals/admin-modal-edit-category/admin-modal-edit-category.component";
import { AdminContactPersonsComponent } from "./admin-contact-persons/admin-contact-persons.component";
import { AdminModalAddContactPersonComponent } from "./admin-modals/admin-modal-add-contact-person/admin-modal-add-contact-person.component";
import { AdminModalEditContactPersonComponent } from "./admin-modals/admin-modal-edit-contact-person/admin-modal-edit-contact-person.component";
import { AdminModalAddUserComponent } from "./admin-modals/admin-modal-add-user/admin-modal-add-user.component";
import { AdminModalEditUserComponent } from "./admin-modals/admin-modal-edit-user/admin-modal-edit-user.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    AdminProjectsComponent,
    AdminDistributorsComponent,
    AdminUsersComponent,
    AdminClientsComponent,
    AdminCategoriesComponent,
    AdminContactPersonsComponent,
    AdminModalAddProjectComponent,
    AdminModalAddClientComponent,
    AdminModalAddDistributorComponent,
    AdminModalEditProjectComponent,
    AdminModalEditDistributorComponent,
    AdminModalEditClientComponent,
    AdminModalAddCategoryComponent,
    AdminModalEditCategoryComponent,
    AdminModalAddContactPersonComponent,
    AdminModalEditContactPersonComponent,
    AdminModalAddUserComponent,
    AdminModalEditUserComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, AgGridModule.withComponents([]), NgxSpinnerModule],
  entryComponents: [
    AdminModalAddProjectComponent,
    AdminModalAddClientComponent,
    AdminModalAddDistributorComponent,
    AdminModalEditProjectComponent,
    AdminModalEditDistributorComponent,
    AdminModalEditClientComponent,
    AdminModalAddCategoryComponent,
    AdminModalEditCategoryComponent,
    AdminModalAddContactPersonComponent,
    AdminModalEditContactPersonComponent,
    AdminModalAddUserComponent,
    AdminModalEditUserComponent,
  ],
})
export class AdminModule {}
