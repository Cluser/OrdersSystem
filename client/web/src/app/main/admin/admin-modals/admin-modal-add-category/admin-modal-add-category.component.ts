import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from "@shared/api/api.service";
import { ICategory } from "@shared/models";

@Component({
  selector: "app-admin-modal-add-category",
  templateUrl: "./admin-modal-add-category.component.html",
  styleUrls: ["./admin-modal-add-category.component.scss"],
})
export class AdminModalAddCategoryComponent implements OnInit {
  @Output() categoryAddedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public category: ICategory = {};

  constructor(private api: ApiService) {}

  ngOnInit() {}

  public addCategory(category: ICategory): void {
    this.api.category.addCategory(category).subscribe(() => {
      this.categoryAddedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }
}
