import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChartBar, faDatabase, faShoppingBasket, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // Icons
  public faSlidersH = faSlidersH
  public faShoppingBasket = faShoppingBasket;
  public faChartBar = faChartBar
  public faDatabase = faDatabase

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
      if (route instanceof NavigationEnd) this.selectMenu(route.url)
    });
  }

  public selectMenu(menu: string) {
    if (menu.startsWith('/admin')) this.selectedMenu = 'admin';
    if (menu.startsWith('/purchase')) this.selectedMenu = 'purchase';
    if (menu.startsWith('/statistic')) this.selectedMenu = 'statistic';
  }
  
}
