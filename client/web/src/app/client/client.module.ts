import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientTableComponent } from './client-table/client-table.component';
import { ClientMenuLeftComponent } from './client-menu-left/client-menu-left.component';
import { ClientMenuRightComponent } from './client-menu-right/client-menu-right.component';
import { ClientMenuLeftDetailsComponent } from './client-menu-left-details/client-menu-left-details.component';
import { ClientModalAddItemComponent } from './client-shared/modals/client-modal-add-item/client-modal-add-item.component';
import { ClientModalEditItemComponent } from './client-shared/modals/client-modal-edit-item/client-modal-edit-item.component';



@NgModule({
  declarations: [
    ClientComponent,
    ClientTableComponent,
    ClientMenuLeftComponent,
    ClientMenuRightComponent,
    ClientMenuLeftDetailsComponent,
    ClientModalAddItemComponent,
    ClientModalEditItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    ClientModalAddItemComponent,
    ClientModalEditItemComponent
  ]
})
export class ClientModule { }
