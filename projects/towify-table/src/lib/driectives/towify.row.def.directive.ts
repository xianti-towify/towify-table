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
  selector: '[towifyRowDef]'
})
export class TowifyRowDefDirective implements OnDestroy {
  #updateRenderObserve: any;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly service: TowifyTableService
  ) {
    this.updateRenderRow();
    this.#updateRenderObserve = this.service.updateRenderObserve.subscribe(() => {
      this.updateRenderRow();
    });
  }

  /**
   * 滑动过程中 view 的更新， 根据它的 index 处理
   * 向下滑动
   * 1234567
   *  2345678
   * 去 1 加 8
   *
   * 向上滑动
   *   3456789
   *  2345678
   *  加 2 去 9
   * */

  updateRenderRow(): void {
    if (this.service.renderDataSource.length <= 0) {
      this.viewContainerRef.clear();
      return;
    }
    for (
      let index = this.service.renderRange.startIndex;
      index <= this.service.renderRange.endIndex;
      index += 1
    ) {
      let currentView: EmbeddedViewRef<any> = this.viewContainerRef.get(
        index - this.service.renderRange.startIndex
      ) as EmbeddedViewRef<any>;
      if (!currentView) {
        currentView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: this.service.renderDataSource[index - this.service.renderRange.startIndex],
          index
        });
      } else if (currentView.context.index !== index) {
        if (currentView.context.index < index) {
          // 创建个新的
          this.viewContainerRef.remove(index - this.service.renderRange.startIndex);
          index -= 1;
        } else {
          currentView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
            $implicit: this.service.renderDataSource[index - this.service.renderRange.startIndex],
            index
          });
          this.viewContainerRef.move(currentView, index - this.service.renderRange.startIndex);
        }
      } else {
        currentView.context.$implicit =
          this.service.renderDataSource[index - this.service.renderRange.startIndex];
        currentView.context.index = index;
      }
      const element: HTMLElement = currentView.rootNodes[0];
      if (element) {
        element.style.position = 'absolute';
        element.style.display = 'flex';
        element.style.flexDirection = 'row';
        element.style.width = '100%';
        element.style.height = `${this.service.rowHeight}px`;
        element.style.top = `${index * this.service.rowHeight}px`;
      }
    }
    while (this.viewContainerRef.length > this.service.renderDataSource.length) {
      this.viewContainerRef.remove(this.viewContainerRef.length - 1);
    }
  }

  ngOnDestroy() {
    this.#updateRenderObserve.unsubscribe();
  }
}
