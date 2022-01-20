import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

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
      if (route instanceof NavigationEnd) this.selectMenu(route.url.replace('/admin/',''))
    });
  }

  public selectMenu(menu: string) {
    this.selectedMenu = menu;
  }



}
