import { Component, OnInit } from '@angular/core';
import { TowifyTableDatasource } from '../../../towify-table/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'staff';
  rowHeight = 40;

  dataSource: { [key: string]: string }[] = Array.from({ length: 1000 }).map((_, i) => ({
    id: i.toString(),
    name: 'test',
    age: `age ${Math.ceil(Math.random() * 100)}`,
    image:
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3206689113,2237998950&fm=26&gp=0.jpg'
  }));

  tableDataSource: TowifyTableDatasource = new TowifyTableDatasource();

  columnInfos: { [key: string]: any }[] = [
    { hashName: 'id', displayName: '.No', width: 100, type: 'text', iconName: '' },
    { hashName: 'name', displayName: 'name', width: 200, type: 'text', iconName: '' },
    { hashName: 'age', displayName: 'age', width: 300, type: 'text', iconName: '' },
    { hashName: 'image', displayName: 'image', width: 100, type: 'image', iconName: '' }
  ];

  ngOnInit() {
    this.tableDataSource.data = this.dataSource;
    this.tableDataSource.updateDataRender();
  }
}
