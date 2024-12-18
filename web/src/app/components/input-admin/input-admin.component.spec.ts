import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAdminComponent } from './input-admin.component';

describe('InputAdminComponent', () => {
  let component: InputAdminComponent;
  let fixture: ComponentFixture<InputAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
