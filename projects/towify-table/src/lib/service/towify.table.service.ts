/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { Injectable } from '@angular/core';
import {
  TableColumnInfoType,
  TableScrollDirectionType,
  tableSizeConfigInfo
} from '../type/towify.table.type';
import { ITowifyTableService } from '../interface/towify.table.service.interface';

@Injectable({
  providedIn: 'root'
})
export class TowifyTableService implements ITowifyTableService {
  #updateRenderCallbacks: (() => void)[] = [];
  #updateRenderConfigCallbacks: (() => void)[] = [];

  #dataSource: { [key: string]: any }[] = [];
  renderDataSource: { [key: string]: string | number | boolean | Date }[] = [];
  renderRange: { startIndex: number; endIndex: number } = { startIndex: 0, endIndex: 10 };
  dataContainerTranslate3d: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
  columnInfos: TableColumnInfoType[] = [];
  renderItemSize = 0;
  rowHeight = 0;
  headerHeight = 0;
  footerHeight = 0;
  dataContainerWidth = 0;
  dataContainerHeight = 0;
  tableContainerWidth = 0;
  tableContainerHeight = 0;
  stickyFirstColumn = false;
  scrollDirection: TableScrollDirectionType = 'unknown';

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
        this.renderRange.startIndex = Math.floor(this.dataContainerTranslate3d.y / this.rowHeight);
      } else {
        this.dataContainerTranslate3d.y = this.renderRange.startIndex * this.rowHeight;
      }
      this.renderRange.endIndex =
        this.renderRange.startIndex + this.renderItemSize < this.dataSource.length
          ? this.renderRange.startIndex + this.renderItemSize
          : this.dataSource.length - 1;
      this.renderDataSource = this.dataSource.slice(
        this.renderRange.startIndex,
        this.renderRange.endIndex
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
      tableWidth += columnInfo.width ?? tableSizeConfigInfo.defaultColumnWidth;
    });
    this.dataContainerWidth = tableWidth;
    this.#updateRenderConfigCallbacks.forEach(value => {
      value();
    });
    this.updateRender();
  }

  public updateRender(): void {
    this.#updateRenderCallbacks.forEach(value => {
      value();
    });
  }

  public onUpdateRenderCallback(callback: () => void): void {
    this.#updateRenderCallbacks.push(callback);
  }

  public onUpdateRenderConfigCallback(callback: () => void): void {
    this.#updateRenderConfigCallbacks.push(callback);
  }

  public scrollToIndex(index: number): void {
    if (index === this.renderRange.startIndex) return;
    this.renderRange.startIndex = Math.min(
      Math.max(0, index),
      Math.max(this.dataSource.length - this.renderItemSize, 0)
    );
    this.updateRenderConfig();
  }
}
