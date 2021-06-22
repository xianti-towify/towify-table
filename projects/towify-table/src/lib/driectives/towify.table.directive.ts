/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { Directive, ElementRef } from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';

@Directive({
  selector: '[TowifyTable]'
})
export class TowifyTableDirective {
  constructor(
    private readonly el: ElementRef,
    private readonly service: TowifyTableService
  ) {
    this.service.onUpdateRenderConfigCallback(() => {
      this.el.nativeElement.style.transform = `translate3d(${ (-this.service.dataContainerTranslate3d.x).toString() }px,
       ${ (-this.service.dataContainerTranslate3d.y).toString() }px,
       ${ (-this.service.dataContainerTranslate3d.z).toString() }px)`;
    });
    const scroll = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        if (event.deltaX >= 0) {
          this.service.scrollDirection = 'right';
        } else {
          this.service.scrollDirection = 'left';
        }
        this.service.dataContainerTranslate3d.x += event.deltaX;
        if (this.service.dataContainerTranslate3d.x > this.service.dataContainerWidth - this.service.tableContainerWidth) {
          this.service.dataContainerTranslate3d.x = this.service.dataContainerWidth - this.service.tableContainerWidth;
        }
        if (this.service.dataContainerTranslate3d.x < 0) { this.service.dataContainerTranslate3d.x = 0;}
      } else {
        if (event.deltaY >= 0) {
          this.service.scrollDirection = 'down';
        } else {
          this.service.scrollDirection = 'up';
        }
        this.service.dataContainerTranslate3d.y += event.deltaY;
        if (this.service.dataContainerTranslate3d.y >
          this.service.dataSource.length * this.service.rowHeight - this.service.tableContainerHeight + this.service.headerHeight) {
          this.service.dataContainerTranslate3d.y = this.service.dataSource.length * this.service.rowHeight -
            this.service.tableContainerHeight + this.service.headerHeight;
        }
        if (this.service.dataContainerTranslate3d.y < 0) { this.service.dataContainerTranslate3d.y = 0;}
      }
      this.el.nativeElement.style.transform = `translate3d(${ (-this.service.dataContainerTranslate3d.x).toString() }px,
       ${ (-this.service.dataContainerTranslate3d.y).toString() }px,
       ${ (-this.service.dataContainerTranslate3d.z).toString() }px)`;
      this.service.renderRange.startIndex = Math.floor(this.service.dataContainerTranslate3d.y/this.service.rowHeight);
      this.service.renderRange.endIndex = Math.min(this.service.renderRange.startIndex + this.service.renderItemSize,
        this.service.dataSource.length);
      this.service.renderDataSource = this.service.dataSource.slice(
        this.service.renderRange.startIndex,
        this.service.renderRange.endIndex
      );
      this.service.updateRenderDataSources();
    };
    el.nativeElement.addEventListener('wheel',scroll, true);
  }
}
