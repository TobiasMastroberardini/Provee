import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProoductTableComponent } from './prooduct-table.component';

describe('ProoductTableComponent', () => {
  let component: ProoductTableComponent;
  let fixture: ComponentFixture<ProoductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProoductTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProoductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
