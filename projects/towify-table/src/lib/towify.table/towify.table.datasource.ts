/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */
import { TowifyTableService } from '../service/towify.table.service';

export class TowifyTableDatasource {
  #service?: TowifyTableService;

  #data: { [key: string]: any }[] = [];

  set service(service: TowifyTableService) {
    this.#service = service;
  }

  set data(data: { [key: string]: any }[]) {
    this.#data = data;
  }

  get data(): { [key: string]: any }[] {
    return this.#data;
  }

  public updateDataRender() {
    if (!this.#service) return;
    this.#service.dataSource = this.#data;
    this.#service.updateRenderConfig();
  }

  public scrollToIndexPath(indexPath: { row: number; column: number }): void {
    this.#service?.scrollToIndexPath(indexPath);
  }
}