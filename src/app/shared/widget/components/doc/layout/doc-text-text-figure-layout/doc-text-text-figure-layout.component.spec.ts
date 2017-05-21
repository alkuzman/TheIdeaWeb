import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTextTextFigureLayoutComponent } from './doc-text-text-figure-layout.component';

describe('DocTextTextFigureLayoutComponent', () => {
  let component: DocTextTextFigureLayoutComponent;
  let fixture: ComponentFixture<DocTextTextFigureLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTextTextFigureLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTextTextFigureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
