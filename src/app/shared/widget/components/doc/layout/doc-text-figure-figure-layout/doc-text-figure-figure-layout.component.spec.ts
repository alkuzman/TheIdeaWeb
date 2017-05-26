import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTextFigureFigureLayoutComponent } from './doc-text-figure-figure-layout.component';

describe('DocTextFigureFigureLayoutComponent', () => {
  let component: DocTextFigureFigureLayoutComponent;
  let fixture: ComponentFixture<DocTextFigureFigureLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTextFigureFigureLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTextFigureFigureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
