/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';
import { TableColumnInfoType, tableSizeConfigInfo } from '../type/towify.table.type';
import { TowifyTableDatasource } from './towify.table.datasource';

@Component({
  selector: 'towify-table',
  templateUrl: './towify-table.component.html',
  styleUrls: ['./towify-table.component.scss']
})
export class TowifyTableComponent implements OnInit, OnChanges {
  @ContentChild('header', { static: false }) headerTemplate!: TemplateRef<{ [key: string]: any }>;

  @Input()
  dataSource: TowifyTableDatasource = new TowifyTableDatasource();

  @Input()
  rowHeight = tableSizeConfigInfo.rowHeight;

  @Input()
  headerHeight = tableSizeConfigInfo.headerHeight;

  @Input()
  footerHeight = tableSizeConfigInfo.footerHeight;

  @Input()
  stickyFirstColumn = false;

  @Input()
  columnInfos: TableColumnInfoType[] = [];

  tableHeight = tableSizeConfigInfo.tableHeight;
  tableWidth = tableSizeConfigInfo.tableWidth;

  constructor(private readonly el: ElementRef, public readonly service: TowifyTableService) {
    window.addEventListener('resize', () => {
      this.tableWidth = (this.el.nativeElement as HTMLElement).clientWidth;
      this.tableHeight = (this.el.nativeElement as HTMLElement).clientHeight;
      // 当窗口变更的时候，如果窗口缩小，y 轴渲染范围不需要处理，如果窗口扩大，当内容没触底 y 轴渲染不需要处理，如果触底了，需要调整 y 轴
      this.updateServiceRenderConfig();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.service.tableContainerHeight = changes.tableHeight
      ? changes.tableHeight.currentValue
      : this.tableHeight;
    this.service.tableContainerWidth = changes.tableWidth
      ? changes.tableWidth.currentValue
      : this.tableWidth;
    this.service.headerHeight = changes.headerHeight
      ? changes.headerHeight.currentValue
      : this.headerHeight;
    this.service.footerHeight = changes.footerHeight
      ? changes.footerHeight.currentValue
      : this.footerHeight;
    this.service.rowHeight = changes.rowHeight ? changes.rowHeight.currentValue : this.rowHeight;
    this.service.columnInfos = changes.columnInfos
      ? changes.columnInfos.currentValue
      : this.columnInfos;
    this.service.stickyFirstColumn = changes.stickyFirstColumn
      ? changes.stickyFirstColumn.currentValue
      : this.stickyFirstColumn;
    const dataSource: TowifyTableDatasource = changes.dataSource
      ? changes.dataSource.currentValue
      : this.dataSource;
    this.service.dataSource = dataSource.data;
    this.updateServiceRenderConfig();
  }

  ngOnInit(): void {
    this.dataSource.service = this.service;
    this.tableWidth = (this.el.nativeElement as HTMLElement).clientWidth;
    this.tableHeight = (this.el.nativeElement as HTMLElement).clientHeight;
    this.updateServiceRenderConfig();
  }

  private updateServiceRenderConfig(): void {
    this.service.tableContainerHeight = this.tableHeight;
    this.service.tableContainerWidth = this.tableWidth;
    this.service.updateRenderConfig();
  }
}
