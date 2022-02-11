import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: ['./purchase-menu.component.scss']
})
export class PurchaseMenuComponent implements OnInit {

  public selectedMenu: string = '';

  private routing$: Subscription;

  constructor(private router: Router) { 
    this.routing$ = this.checkRoutingChange()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routing$.unsubscribe()
  }

  private checkRoutingChange() {
    return this.routing$ = this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) this.selectMenu(route.url.replace('/purchase/','').split("?")[0])
    });
  }

  public selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

}
