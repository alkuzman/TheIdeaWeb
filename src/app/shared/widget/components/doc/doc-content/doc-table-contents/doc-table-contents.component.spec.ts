import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTableContentsComponent } from './doc-table-contents.component';

describe('DocTableContentsComponent', () => {
  let component: DocTableContentsComponent;
  let fixture: ComponentFixture<DocTableContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTableContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTableContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
