import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocHeaderComponent } from './doc-header.component';

describe('DocHeaderComponent', () => {
  let component: DocHeaderComponent;
  let fixture: ComponentFixture<DocHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
