import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminComponent } from './admin.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { AdminDistributorsComponent } from './admin-distributors/admin-distributors.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AgGridModule } from 'ag-grid-angular';
import { AdminModalAddProjectComponent } from './admin-modals/admin-modal-add-project/admin-modal-add-project.component';
import { AdminModalAddClientComponent } from './admin-modals/admin-modal-add-client/admin-modal-add-client.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    AdminProjectsComponent,
    AdminDistributorsComponent,
    AdminUsersComponent,
    AdminClientsComponent,
    AdminModalAddProjectComponent,
    AdminModalAddClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    AdminModalAddProjectComponent,
    AdminModalAddClientComponent
  ]
})
export class AdminModule { }
