/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TowifyRowDefDirective } from './driectives/towify.row.def.directive';
import { TowifyTableDirective } from './driectives/towify.table.directive';
import { TowifyTableComponent } from './towify-table/towify-table.component';
import { TowifyColumnDefDirective } from './driectives/towify.column.def.directive';
import { TowifyTableService } from './service/towify.table.service';

@NgModule({
  declarations: [
    TowifyColumnDefDirective,
    TowifyRowDefDirective,
    TowifyTableDirective,
    TowifyTableComponent
  ],
  imports: [BrowserModule, CommonModule],
  providers: [TowifyTableService],
  exports: [TowifyColumnDefDirective, TowifyRowDefDirective, TowifyTableComponent]
})
export class TowifyTableModule {}
