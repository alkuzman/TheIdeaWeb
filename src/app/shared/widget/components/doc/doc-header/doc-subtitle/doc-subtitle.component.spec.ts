import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSubtitleComponent } from './doc-subtitle.component';

describe('DocSubtitleComponent', () => {
  let component: DocSubtitleComponent;
  let fixture: ComponentFixture<DocSubtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocSubtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
