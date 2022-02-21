import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MainComponent, 
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FontAwesomeModule
  ]
})
export class MainModule { }
