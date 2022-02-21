import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../shared/api/api.service'
import { ICategory } from '../../../../shared/models';

@Component({
  selector: 'app-admin-modal-edit-category',
  templateUrl: './admin-modal-edit-category.component.html',
  styleUrls: ['./admin-modal-edit-category.component.scss']
})
export class AdminModalEditCategoryComponent implements OnInit {

  @Output() categoryEditedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  public category: ICategory = {};

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  public editCategory(category: ICategory): void {
    this.api.category.editCategory(category).subscribe(() => {
      this.categoryEditedEvent.emit();
      this.close();
    });
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
