import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationResponseComponent } from './creation-response.component';

describe('CreationResponseComponent', () => {
  let component: CreationResponseComponent;
  let fixture: ComponentFixture<CreationResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
