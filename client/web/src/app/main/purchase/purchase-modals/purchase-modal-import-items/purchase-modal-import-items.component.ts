import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/api/authentication/auth.service';
import { ICategory, IItem, IProject, IUser } from 'src/app/shared/models';
import * as excel from "xlsx";

@Component({
  selector: 'app-purchase-modal-import-items',
  templateUrl: './purchase-modal-import-items.component.html',
  styleUrls: ['./purchase-modal-import-items.component.scss']
})
export class PurchaseModalImportItemsComponent implements OnInit {

  @Output() itemsImportedEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();


  public categories: ICategory[] = [];
  public projects: IProject[] = [];
  public user: IUser = {}

  public selectedCategoryId: number = 0;
  public selectedProjectId: number = 0;

  public files: File[] = [];

  constructor(private api: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
    this.getUser();
  }

  private getCategories(): void {
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => this.categories = categories.items);
  }

  private getProjects(): void {
    this.api.project.getProjects({}, 1, 1000).subscribe((projects) => this.projects = projects.items);
  }

  private getUser(): void {
    this.authService.getLoggedInUser().subscribe((user) => this.user = user)
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);

  }

  public onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public addItem(): void {
    const file = this.files[0];
    const reader: FileReader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {

      // upload file
      const binarystr = new Uint8Array(e.target.result);
      const wb: excel.WorkBook = excel.read(binarystr, { type: 'array', raw: true, cellFormula: false });
      console.log(wb.Sheets)

      const wsname = wb.SheetNames[0];
      let ws = wb.Sheets[wsname]
      ws['!ref'] = "B9:I50"
      const data: any = excel.utils.sheet_to_json(ws);
      console.log(data) 

      data.forEach((x: any) => {
        let item: Partial<IItem> = {
          name: x["PRODUCENT"] + " " + x["OZNACZENIE 3"],
          model: x["NUMER TYPU"],
          quantity: x["ILOŚĆ SZTUK"],
          archived: false,
          idCategory: this.selectedCategoryId,
          idProject: this.selectedProjectId, 
          idUser: this.user.id
        }

        this.api.item.addItems(item).subscribe(() => {
          this.itemsImportedEvent.emit();
        });
      })
    }
  }

  public close(): void {
    this.closeEvent.emit();
  }

}