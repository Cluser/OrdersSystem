import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  public selectedMenu: string = 'Items';

  constructor() { }

  ngOnInit(): void {
  }

  public selectMenu(menu: string) {
    this.selectedMenu = menu;

    switch (this.selectedMenu) {
      case 'Items':

        break;
      case 'Inquiries':

        break;
      case 'Offers':

        break;
      case 'Orders':

        break;

    }
  }

}
