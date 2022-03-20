import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/shared/api/authentication/auth.service';
import { ApiService } from '../../../../shared/api/api.service';
import { ICategory, IDistributor, IItem, IProject, IUser } from '../../../../shared/models';

@Component({
  selector: 'app-purchase-modal-add-item',
  templateUrl: './purchase-modal-add-item.component.html',
  styleUrls: ['./purchase-modal-add-item.component.scss']
})
export class PurchaseModalAddItemComponent implements OnInit {

  @Output() itemAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public item: IItem = {};
  public categories: ICategory[] = [];
  public projects: IProject[] = [];
  public distributors: IDistributor[] = [];
  public user: IUser = {}

  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.getCategories();
    this.getProjects();
    this.getDistributors();
    this.getUser();
  }

  private getCategories(): void {
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }


  private getProjects(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  private getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  private getUser(): void {
    this.authService.getLoggedInUser().subscribe((user) => this.user = user)
  }

  public addItem(item: IItem): void {
    item.idUser = this.user.id;
    item.archived = false;
    this.api.item.addItems(item).subscribe(() => {
      this.itemAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
