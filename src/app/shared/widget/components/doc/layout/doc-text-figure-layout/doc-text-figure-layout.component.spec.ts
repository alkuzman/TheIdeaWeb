import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTextFigureLayoutComponent } from './doc-text-figure-layout.component';

describe('DocTextFigureLayoutComponent', () => {
  let component: DocTextFigureLayoutComponent;
  let fixture: ComponentFixture<DocTextFigureLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTextFigureLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTextFigureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
