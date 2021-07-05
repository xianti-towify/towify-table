/**
 * @Author  : xiongxianti
 * @Date    : 2021/6/11
 * */
import { ITowifyTableService } from '../interface/towify.table.service.interface';
import { TowifyTableService } from '../service/towify.table.service';

export class TowifyTableDatasource {
  #service?: TowifyTableService;

  #data: { [key: string]: any }[] = [];

  set service(service: ITowifyTableService) {
    this.#service = service as TowifyTableService;
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

  public scrollToIndex(index: number): void {
    this.#service?.scrollToIndex(index);
  }
}
