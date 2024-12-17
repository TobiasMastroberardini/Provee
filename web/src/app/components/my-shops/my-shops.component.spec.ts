import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopsComponent } from './my-shops.component';

describe('MyShopsComponent', () => {
  let component: MyShopsComponent;
  let fixture: ComponentFixture<MyShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
