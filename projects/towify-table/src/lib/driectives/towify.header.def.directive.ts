/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */

import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';

@Directive({
  selector: '[towifyHeaderDef]'
})
export class TowifyHeaderDefDirective {
  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly service: TowifyTableService
  ) {
    this.updateRenderHeader();
    this.service.onUpdateRenderConfigCallback(() => {
      this.updateRenderHeader();
    });
    this.service.onUpdateRenderCallback(() => {
      this.updateRenderHeader();
    });
  }

  updateRenderHeader(): void {
    this.viewContainerRef.clear();
    this.service.columnInfos.forEach((columnInfo, index) => {
      const headerView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: columnInfo,
        index
      });
      const element: HTMLElement = headerView.rootNodes[0];
      if (element) {
        element.style.position = 'relative';
        element.style.boxSizing = 'border-box';
        element.style.width = `${columnInfo.width}px`;
        element.style.height = '100%';
        if (index === 0 && this.service.stickyFirstColumn) {
          element.style.zIndex = '100';
          element.style.left = `${this.service.dataContainerTranslate3d.x}px`;
        }
      }
    });
  }
}
