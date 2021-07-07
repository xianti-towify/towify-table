import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowifyTableComponent } from './towify.table.component';

describe('TowifyTableComponent', () => {
  let component: TowifyTableComponent;
  let fixture: ComponentFixture<TowifyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TowifyTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TowifyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
