import { TestBed } from '@angular/core/testing';

import { TowifyTableService } from './towify-table.service';

describe('TowifyTableService', () => {
  let service: TowifyTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TowifyTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
