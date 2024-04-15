import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionResponseComponent } from './deletion-response.component';

describe('DeletionResponseComponent', () => {
  let component: DeletionResponseComponent;
  let fixture: ComponentFixture<DeletionResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
