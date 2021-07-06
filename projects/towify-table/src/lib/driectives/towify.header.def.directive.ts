/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
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
  selector: '[towifyHeaderDef]'
})
export class TowifyHeaderDefDirective implements OnDestroy {
  #updateRenderObserve: any;
  #clearRenderObserve: any;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly service: TowifyTableService
  ) {
    this.updateRenderHeader();
    this.#updateRenderObserve = this.service.updateRenderObserve.subscribe(() => {
      this.updateRenderHeader();
    });
    this.#clearRenderObserve = this.service.clearObserve.subscribe(() => {
      this.viewContainerRef.clear();
    });
  }

  updateRenderHeader(): void {
    this.service.columnInfos.forEach((columnInfo, index) => {
      let headerView: EmbeddedViewRef<any> = this.viewContainerRef.get(
        index
      ) as EmbeddedViewRef<any>;
      if (!headerView) {
        headerView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: columnInfo,
          index
        });
      } else {
        headerView.context.$implicit = columnInfo;
        headerView.context.index = index;
      }
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

  ngOnDestroy() {
    this.#updateRenderObserve.unsubscribe();
    this.#clearRenderObserve.unsubscribe();
  }
}
