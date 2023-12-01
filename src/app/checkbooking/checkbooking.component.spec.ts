import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookingComponent } from './checkbooking.component';

describe('CheckbookingComponent', () => {
  let component: CheckbookingComponent;
  let fixture: ComponentFixture<CheckbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckbookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
