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



@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    AdminProjectsComponent,
    AdminDistributorsComponent,
    AdminUsersComponent,
    AdminClientsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class AdminModule { }
