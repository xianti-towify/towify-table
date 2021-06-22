/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { Injectable } from '@angular/core';
import { TableColumnInfoType, TableScrollDirectionType, tableSizeConfigInfo } from '../type/towify.table.type';

@Injectable({
  providedIn: 'root'
})

export class TowifyTableService {

  #updateRenderCallbacks: (() => void)[] = [];
  #updateRenderConfigCallbacks: (() => void)[] = [];

  dataSource: { [key: string]: string | number | boolean | Date }[] = [];
  renderDataSource: { [key: string]: string | number | boolean | Date }[] = [];
  renderRange: { startIndex: number; endIndex: number; } = { startIndex: 0, endIndex: 10 };
  dataContainerTranslate3d: { x: number; y: number; z: number; } = { x: 0, y: 0, z: 0 };
  columnInfos: TableColumnInfoType[] = [];
  renderItemSize = 0;
  rowHeight = 0;
  headerHeight = 0;
  dataContainerWidth = 0;
  dataContainerHeight = 0;
  tableContainerWidth = 0;
  tableContainerHeight = 0;
  stickyFirstColumn = false;
  scrollDirection: TableScrollDirectionType = 'unknown';

  updateRenderDataSources(): void {
    this.#updateRenderCallbacks.forEach(value => {
      value();
    });
  }

  onUpdateRenderCallback(callback: () => void): void {
    this.#updateRenderCallbacks.push(callback);
  }

  updateRenderConfig(): void {
    let tableWidth = 0;
    this.columnInfos.forEach(columnInfo => {
      tableWidth += columnInfo.width ?? tableSizeConfigInfo.defaultColumnWidth;
    });
    this.dataContainerWidth = tableWidth;
    this.#updateRenderConfigCallbacks.forEach(value => {
      value();
    });
    this.updateRenderDataSources();
  }

  onUpdateRenderConfigCallback(callback: () => void): void {
    this.#updateRenderConfigCallbacks.push(callback);
  }

}
