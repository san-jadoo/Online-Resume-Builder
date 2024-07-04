import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UregisterComponent } from './uregister.component';

describe('UregisterComponent', () => {
  let component: UregisterComponent;
  let fixture: ComponentFixture<UregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
