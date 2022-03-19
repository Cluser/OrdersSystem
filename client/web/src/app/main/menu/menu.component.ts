import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faChartBar, faDatabase, faShoppingBasket, faSlidersH, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/api/authentication/auth.service';

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
  public faSignOutAlt = faSignOutAlt

  public selectedMenu: string = '';
  private routing$: Subscription;

  constructor(private router: Router, private auth: AuthService) { 
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
    if (menu.startsWith('/main/admin')) this.selectedMenu = 'admin';
    if (menu.startsWith('/main/purchase')) this.selectedMenu = 'purchase';
    if (menu.startsWith('/main/statistic')) this.selectedMenu = 'statistic';
  }

  public logout() {
    this.auth.logout().subscribe(x => this.router.navigate(['login']));
  }
}
