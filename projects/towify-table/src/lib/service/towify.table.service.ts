/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { EventEmitter, Injectable } from '@angular/core';
import { TableColumnInfoType } from '../type/towify.table.type';
import { ITowifyTableService } from '../interface/towify.table.service.interface';

@Injectable({
  providedIn: 'root'
})
export class TowifyTableService implements ITowifyTableService {
  #dataSource: { [key: string]: any }[] = [];
  #columnInfos: TableColumnInfoType[] = [];

  // 更新渲染的观察者，当需要更新渲染，通知组件更新
  updateRenderObserve: EventEmitter<any> = new EventEmitter<any>();
  clearObserve: EventEmitter<any> = new EventEmitter<any>();

  renderDataSource: { [key: string]: string | number | boolean | Date }[] = [];
  renderRange: { startIndex: number; endIndex: number } = { startIndex: 0, endIndex: 10 };
  dataContainerTranslate3d: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  renderItemSize = 0;
  rowHeight = 0;
  headerHeight = 0;
  footerHeight = 0;
  dataContainerWidth = 0;
  dataContainerHeight = 0;
  tableContainerWidth = 0;
  tableContainerHeight = 0;
  stickyFirstColumn = false;
  scrollDirection: 'up' | 'down' | 'left' | 'right' | 'unknown' = 'unknown';

  set dataSource(dataSource: { [key: string]: any }[]) {
    if (dataSource.length < this.#dataSource.length) {
      this.dataContainerTranslate3d.x = 0;
      this.dataContainerTranslate3d.y = 0;
      this.renderRange.startIndex = 0;
      this.renderRange.endIndex = this.renderItemSize;
    }
    this.#dataSource = dataSource;
    this.dataContainerHeight = this.dataSource.length * this.rowHeight + this.footerHeight;
  }

  get dataSource(): { [key: string]: any }[] {
    return this.#dataSource;
  }

  set columnInfos(columnInfos: TableColumnInfoType[]) {
    if (columnInfos.length < this.#columnInfos.length) this.clearObserve.emit();
    this.#columnInfos = columnInfos;
  }

  get columnInfos(): TableColumnInfoType[] {
    return this.#columnInfos;
  }

  public updateRenderConfig(): void {
    this.renderItemSize = Math.min(
      Math.ceil(this.tableContainerHeight / this.rowHeight) + 2,
      this.dataSource.length
    );
    if (this.dataSource.length === 0) {
      this.renderDataSource = [];
      this.renderRange = { startIndex: 0, endIndex: 0 };
      this.dataContainerTranslate3d = { x: 0, y: 0, z: 0 };
    } else {
      const lastDataContainerTranslate3dY = this.dataContainerTranslate3d.y;
      // 注意如果 resize 窗口内容触底了需要调整renderRange 和 dataContainerTranslate3d.y
      if (lastDataContainerTranslate3dY + this.tableContainerHeight > this.dataContainerHeight) {
        this.dataContainerTranslate3d.y = Math.max(
          this.dataContainerHeight - this.tableContainerHeight,
          0
        );
        this.renderRange.startIndex = Math.max(
          Math.floor(this.dataContainerTranslate3d.y / this.rowHeight) - 1,
          0
        );
      } else {
        this.dataContainerTranslate3d.y = this.renderRange.startIndex * this.rowHeight;
      }
      this.renderRange.endIndex =
        this.renderRange.startIndex + this.renderItemSize < this.dataSource.length
          ? this.renderRange.startIndex + this.renderItemSize
          : this.dataSource.length - 1;
      this.renderDataSource = this.dataSource.slice(
        this.renderRange.startIndex,
        Math.min(this.renderRange.endIndex + 1, this.dataSource.length)
      );
      const lastDataContainerTranslate3dX = this.dataContainerTranslate3d.x;
      if (lastDataContainerTranslate3dX + this.tableContainerWidth > this.dataContainerWidth) {
        this.dataContainerTranslate3d.x = Math.max(
          this.dataContainerWidth - this.tableContainerWidth,
          0
        );
      }
    }
    let tableWidth = 0;
    this.columnInfos.forEach(columnInfo => {
      tableWidth += columnInfo.width ?? 100;
    });
    this.dataContainerWidth = tableWidth;
    this.updateRender();
  }

  public updateRender(): void {
    this.updateRenderObserve.emit();
  }

  public scrollToIndexPath(indexPath: { row: number; column: number }): void {
    if (indexPath.row < 0 || indexPath.row >= this.dataSource.length) return;
    if (indexPath.column < 0 || indexPath.column >= this.columnInfos.length) return;
    const rowYOffset: { start: number; end: number } = {
      start: indexPath.row * this.rowHeight,
      end: (indexPath.row + 1) * this.rowHeight
    };
    const columnXOffset: { start: number; end: number } = { start: 0, end: 0 };
    const lastDataContainerTranslate3dString = JSON.stringify(this.dataContainerTranslate3d);
    this.columnInfos.forEach((column, index) => {
      if (index < indexPath.column) {
        columnXOffset.start += column.width;
      }
      if (index <= indexPath.column) {
        columnXOffset.end += column.width;
      }
    });
    // 检测 需要滚动的 indexPath 的数据 是否在当前显示区域内如果不在需要手动滚动到该 indexPath
    if (
      this.dataContainerTranslate3d.y > rowYOffset.start ||
      this.dataContainerTranslate3d.y + (this.tableContainerHeight - this.headerHeight) <
        rowYOffset.end
    ) {
      if (this.dataContainerTranslate3d.y > rowYOffset.start) {
        this.dataContainerTranslate3d.y = rowYOffset.start;
        this.renderRange.startIndex = indexPath.row;
      }
      if (
        this.dataContainerTranslate3d.y + (this.tableContainerHeight - this.headerHeight) <
        rowYOffset.end
      ) {
        this.dataContainerTranslate3d.y =
          rowYOffset.end - this.tableContainerHeight + this.headerHeight;
        this.renderRange.startIndex = Math.ceil(
          (rowYOffset.end - (this.tableContainerHeight - this.headerHeight)) / this.rowHeight
        );
      }
    }
    const firstColumnWidth = this.stickyFirstColumn ? this.columnInfos[0].width : 0;
    if (
      this.dataContainerTranslate3d.x > columnXOffset.start - firstColumnWidth ||
      this.dataContainerTranslate3d.x + this.tableContainerWidth < columnXOffset.end
    ) {
      if (this.dataContainerTranslate3d.x > columnXOffset.start - firstColumnWidth) {
        this.dataContainerTranslate3d.x = columnXOffset.start - firstColumnWidth;
      }
      if (this.dataContainerTranslate3d.x + this.tableContainerWidth < columnXOffset.end) {
        this.dataContainerTranslate3d.x = columnXOffset.end - this.tableContainerWidth;
      }
    }
    // 如果未改变偏移量，说明当前需要滚动内容在可视区域内，所以无需重新渲染
    if (lastDataContainerTranslate3dString === JSON.stringify(this.dataContainerTranslate3d))
      return;
    this.updateRenderConfig();
  }
}
