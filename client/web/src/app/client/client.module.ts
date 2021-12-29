import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientTableComponent } from './client-table/client-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientMenuLeftComponent } from './client-menu-left/client-menu-left.component';
import { ClientMenuRightComponent } from './client-menu-right/client-menu-right.component';
import { ClientMenuLeftDetailsComponent } from './client-menu-left-details/client-menu-left-details.component';


@NgModule({
  declarations: [
    ClientComponent,
    ClientTableComponent,
    ClientMenuLeftComponent,
    ClientMenuRightComponent,
    ClientMenuLeftDetailsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class ClientModule { }
