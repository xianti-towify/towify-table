import { Component } from '@angular/core';
import { TableColumnInfoType } from '../../../towify-table/src/lib/type/towify.table.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'staff';
  rowHeight = 40;

  dataSource: { [key: string]: string }[] = Array.from({ length: 1000 }).map((_, i) => ({
    id: i.toString(),
    name: 'test',
    age: `age ${ Math.ceil(Math.random() * 100) }`,
    image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3206689113,2237998950&fm=26&gp=0.jpg'
  }));

  columnInfos: TableColumnInfoType[] = [
    { id: 'id', name:'.No', width: 100, type: 'text', iconName: '' },
    {  id: 'name', name:'name', width: 200, type: 'text', iconName: '' },
    {  id: 'age', name:'age', width: 300, type: 'text', iconName: '' },
    {  id: 'image', name: 'image', width: 100, type: 'image', iconName: '' }
  ];
}
