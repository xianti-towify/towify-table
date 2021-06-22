import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';
import { TableColumnInfoType, tableSizeConfigInfo } from '../type/towify.table.type';
import { TowifyTableHelper } from '../util/towify.table.helper';

@Component({
  selector: 'towify-table',
  templateUrl: './towify-table.component.html',
  styleUrls: ['./towify-table.component.scss']
})
export class TowifyTableComponent implements OnInit, OnChanges {

  @Input()
  dataSource: { [key: string]: string | number | boolean | Date }[] = [];

  @Input()
  rowHeight = tableSizeConfigInfo.rowHeight;

  @Input()
  headerHeight = tableSizeConfigInfo.headerHeight;

  @Input()
  tableHeight = tableSizeConfigInfo.tableHeight;

  @Input()
  tableWidth = tableSizeConfigInfo.tableWidth;

  @Input()
  stickyFirstColumn = false;

  @Input()
  columnInfos: TableColumnInfoType[] = [];

  dataContainerTranslate3d: { x: number; y: number; z: number; } = { x: 0, y: 0, z: 0 };
  dataContainerWidth = 0;
  dataContainerHeight = 0;
  tableSizeConfig = tableSizeConfigInfo;
  helper = TowifyTableHelper;

  constructor(public readonly service: TowifyTableService) {
    this.service.onUpdateRenderConfigCallback(() => {
      this.dataContainerWidth = this.service.dataContainerWidth;
    });
    this.service.onUpdateRenderCallback(() => {
      this.dataContainerTranslate3d = this.service.dataContainerTranslate3d;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.service.tableContainerHeight = this.tableHeight;
    this.service.tableContainerWidth = this.tableWidth;
    this.service.dataContainerHeight = this.dataSource.length * this.rowHeight;
    this.service.headerHeight = this.headerHeight;
    this.service.rowHeight = this.rowHeight;
    this.service.renderItemSize = Math.ceil(this.tableHeight/this.rowHeight) + 2;
    this.service.columnInfos = this.columnInfos;
    this.service.stickyFirstColumn = this.stickyFirstColumn;
    this.service.dataSource = this.dataSource;
    this.dataContainerHeight = this.service.dataContainerHeight;
    if (this.service.renderDataSource.length === 0) {
      this.service.renderDataSource = this.dataSource.slice(0, this.service.renderItemSize);
    }
    if (this.service.renderRange.endIndex - this.service.renderRange.startIndex !== this.service.renderItemSize) {
      this.service.renderRange.endIndex = this.service.renderRange.startIndex + this.service.renderItemSize;
      this.service.renderDataSource = this.dataSource.slice(this.service.renderRange.startIndex, this.service.renderRange.endIndex);
    }
    this.service.dataContainerTranslate3d.y = this.service.renderRange.startIndex * this.service.rowHeight;
    this.service.updateRenderConfig();
  }

  ngOnInit(): void {
  }

}
