/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TowifyHeaderDefDirective } from './driectives/towify.header.def.directive';
import { TowifyRowDefDirective } from './driectives/towify.row.def.directive';
import { TowifyTableDirective } from './driectives/towify.table.directive';
import { TowifyTableComponent } from './towify-table/towify-table.component';
import { TowifyCellDefDirective } from './driectives/towify.cell.def.directive';
import { TowifyTableService } from './service/towify.table.service';

@NgModule({
  declarations: [
    TowifyCellDefDirective,
    TowifyHeaderDefDirective,
    TowifyRowDefDirective,
    TowifyTableDirective,
    TowifyTableComponent
  ],
  imports: [BrowserModule, CommonModule],
  providers: [TowifyTableService],
  exports: [
    TowifyCellDefDirective,
    TowifyHeaderDefDirective,
    TowifyRowDefDirective,
    TowifyTableComponent
  ]
})
export class TowifyTableModule {}
