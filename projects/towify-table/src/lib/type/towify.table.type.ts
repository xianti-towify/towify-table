/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/16
 * */

export type TableFieldValueType = 'id' | 'text' | 'yesOrNo' | 'number' | 'encryptedText' | 'date' | 'image' | 'audio' | 'video' | 'table'

export type TableScrollDirectionType = 'up' | 'down' | 'left' | 'right' | 'unknown';

export type TableColumnInfoType = {
  name: string;
  id: string;
  type: TableFieldValueType;
  iconName: string;
  width?: number;
};

export const tableSizeConfigInfo = {
  tableWidth: 500,
  tableHeight: 700,
  defaultColumnWidth: 200,
  minColumnWidth: 40,
  headerHeight: 40,
  rowHeight: 40,
  draggingColumnIndex: -1,
  selectedColumnIndex: -1
};

export const tableStatusConfigInfo = {
  hasCheckedItem: false,
  hasTotalChecked: false,
  isLoadingMoreData: false,
  hasLoadedAllData: false,
  isResizingColumn: false
};
