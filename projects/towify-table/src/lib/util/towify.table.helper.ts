/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/17
 * */
import interact from 'interactjs';
import { TableColumnInfoType, tableSizeConfigInfo, tableStatusConfigInfo } from '../type/towify.table.type';
import { TowifyTableService } from '../service/towify.table.service';

export class TowifyTableHelper {

  static addColumnResizeInteract(columnInfoList: TableColumnInfoType[], columnIndex: number, service: TowifyTableService): void {
    if (tableStatusConfigInfo.isResizingColumn) {
      return;
    }
    let dragColumnIndex = -1;
    let dragColumnWidth = 0;
    let columnInfo: TableColumnInfoType = columnInfoList[columnIndex];
    interact('.table-column-header').resizable({
      cursorChecker: () => 'ew-resize',
      margin: 10,
      edges: { left: true, right: true, bottom: false, top: false },
      listeners: {
        start: event => {
          tableStatusConfigInfo.isResizingColumn = true;
          const resizeEdge = event.edges;
          dragColumnIndex = columnIndex;
          if (resizeEdge.left) {
            dragColumnIndex -= 1;
          }
          columnInfo = columnInfoList[dragColumnIndex];
          dragColumnWidth = columnInfo.width ?? tableSizeConfigInfo.defaultColumnWidth;
          tableSizeConfigInfo.draggingColumnIndex = dragColumnIndex;
        },
        move: event => {
          dragColumnWidth = TowifyTableHelper.updateColumnWidth({
            dx: event.dx,
            dragColumnWidth,
            columnInfo,
            minColumnWidth: tableSizeConfigInfo.minColumnWidth
          });
          service.updateRenderConfig();
        },
        end: event => {
          dragColumnWidth = TowifyTableHelper.updateColumnWidth({
            dx: event.dx,
            dragColumnWidth,
            columnInfo,
            minColumnWidth: tableSizeConfigInfo.minColumnWidth
          });
          dragColumnWidth = 0;
          dragColumnIndex = -1;
          tableSizeConfigInfo.draggingColumnIndex = -1;
          tableStatusConfigInfo.isResizingColumn = false;
          service.updateRenderConfig();
        }
      }
    });
  }

  private static updateColumnWidth(params: {
    dx: number;
    dragColumnWidth: number;
    columnInfo: TableColumnInfoType;
    minColumnWidth: number;
  }): number {
    const newWidth = params.dragColumnWidth + params.dx;
    if (!params.columnInfo) {
      return newWidth;
    }
    const minColumnWidth =
      params.minColumnWidth > 0 ? params.minColumnWidth : tableSizeConfigInfo.defaultColumnWidth;
    if (newWidth >= minColumnWidth) {
      params.columnInfo.width = newWidth;
    } else {
      params.columnInfo.width = minColumnWidth;
    }
    return newWidth;
  }

}
