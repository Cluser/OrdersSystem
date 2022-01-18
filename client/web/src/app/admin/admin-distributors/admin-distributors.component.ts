import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-admin-distributors',
  templateUrl: './admin-distributors.component.html',
  styleUrls: ['./admin-distributors.component.scss']
})
export class AdminDistributorsComponent implements OnInit {

  public columnDefs: ColDef[] = []
  public rowData: any[] = [];
  public pageSize: number = 1000

  constructor() { }

  ngOnInit(): void {
  }

}
