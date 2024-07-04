import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePreview1Component } from './resume-preview1.component';

describe('ResumePreview1Component', () => {
  let component: ResumePreview1Component;
  let fixture: ComponentFixture<ResumePreview1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePreview1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumePreview1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
