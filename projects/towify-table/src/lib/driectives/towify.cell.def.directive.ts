/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/16
 * */

import {
  Directive,
  EmbeddedViewRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { TowifyTableService } from '../service/towify.table.service';

@Directive({
  selector: '[towifyCellDef]'
})
export class TowifyCellDefDirective implements OnDestroy {
  #updateRenderObserve: any;
  #clearRenderObserve: any;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly service: TowifyTableService
  ) {
    this.updateRenderCell();
    this.#updateRenderObserve = this.service.updateRenderObserve.subscribe(() => {
      this.updateRenderCell();
    });
    this.#clearRenderObserve = this.service.clearObserve.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }

  updateRenderCell(): void {
    this.service.columnInfos.forEach((columnInfo, index) => {
      let currentView: EmbeddedViewRef<any> = this.viewContainerRef.get(
        index
      ) as EmbeddedViewRef<any>;
      if (!currentView) {
        currentView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: columnInfo,
          index
        });
      } else {
        currentView.context.$implicit = columnInfo;
        currentView.context.index = index;
      }
      const element: HTMLElement = currentView.rootNodes[0];
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

  ngOnDestroy() {
    this.#updateRenderObserve.unsubscribe();
    this.#clearRenderObserve.unsubscribe();
  }
}
