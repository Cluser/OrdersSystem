import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.scss']
})
export class PurchaseMenuComponent implements OnInit {

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
