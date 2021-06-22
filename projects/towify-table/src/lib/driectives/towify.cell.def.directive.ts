/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/16
 * */

import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';

@Directive({
  selector: '[towifyCellDef]'
})

export class TowifyCellDefDirective {
  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly service: TowifyTableService
  ) {
    this.updateRenderCell();
    this.service.onUpdateRenderCallback(() => {
      this.updateRenderCell();
    });
  }

  updateRenderCell(): void {
    this.service.columnInfos.forEach((columnInfo, index) => {
      let currentView: EmbeddedViewRef<any> = this.viewContainerRef.get(index) as EmbeddedViewRef<any>;
      if (!currentView) {
       currentView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: columnInfo,
          index
        });
      } else {
        currentView.context.$implicit = columnInfo;
        currentView.context.index =  index;
      }
      const element: HTMLElement = currentView.rootNodes[0];
      if (element) {
        element.style.position = 'relative';
        element.style.boxSizing = 'border-box';
        element.style.borderRight = '1px solid red';
        element.style.borderBottom = '1px solid red';
        element.style.background = 'white';
        element.style.width = `${ columnInfo.width }px`;
        element.style.height = '100%';
        if (index === 0 &&  this.service.stickyFirstColumn) {
          element.style.zIndex = '100';
          element.style.left = `${ this.service.dataContainerTranslate3d.x }px`;
        }
      }
    });
  }
}
