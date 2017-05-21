import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSectionComponent } from './doc-section.component';

describe('DocSectionComponent', () => {
  let component: DocSectionComponent;
  let fixture: ComponentFixture<DocSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
