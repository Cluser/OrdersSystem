import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { IDistributor, IItem, IItemCreate, IProject } from '../../models';

@Component({
  selector: 'app-client-modal-add-item',
  templateUrl: './client-modal-add-item.component.html',
  styleUrls: ['./client-modal-add-item.component.scss']
})
export class ClientModalAddItemComponent implements OnInit {

  @Output() itemAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public item: IItem = {};
  public projects: IProject[] = [];
  public distributors: IDistributor[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProjects();
    this.getDistributors();
  }

  public getProjects(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  public getDistributors(): void {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => this.distributors = distributors.items);
  }

  public addItem(item: IItemCreate): void {
    item.idUser = 1;
    this.api.item.addItems(item).subscribe(() => {
      this.itemAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
