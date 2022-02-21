import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service';
import { ICategory, IDistributor, IItem, IProject } from '../../../../shared/models';

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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCategories();
    this.getProjects();
    this.getDistributors();
  }

  public getCategories(): void {
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }


  public getProjects(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public addItem(item: IItem): void {
    item.idUser = 1;
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
