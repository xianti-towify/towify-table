/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TowifyRowDefDirective } from './driectives/towify.row.def.directive';
import { TowifyTableDirective } from './driectives/towify.table.directive';
import { TowifyTableComponent } from './towify-table/towify-table.component';
import { TowifyCellDefDirective } from './driectives/towify.cell.def.directive';

@NgModule({
  declarations: [
    TowifyCellDefDirective,
    TowifyRowDefDirective,
    TowifyTableDirective,
    TowifyTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    TowifyCellDefDirective,
    TowifyRowDefDirective,
    TowifyTableComponent
  ],
  bootstrap: []
})
export class TowifyTableModule { }
