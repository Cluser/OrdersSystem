import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientTableComponent } from './client-table/client-table.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    ClientComponent,
    ClientTableComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class ClientModule { }
