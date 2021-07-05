/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/16
 * */

export type TableScrollDirectionType = 'up' | 'down' | 'left' | 'right' | 'unknown';

export type TableColumnInfoType = { width: number } & { [key: string]: any };

export const tableSizeConfigInfo = {
  tableWidth: 500,
  tableHeight: 700,
  defaultColumnWidth: 200,
  minColumnWidth: 40,
  headerHeight: 40,
  footerHeight: 40,
  rowHeight: 40
};

export const tableStatusConfigInfo = {
  hasCheckedItem: false,
  hasTotalChecked: false,
  isLoadingMoreData: false,
  hasLoadedAllData: false,
  isResizingColumn: false
};
