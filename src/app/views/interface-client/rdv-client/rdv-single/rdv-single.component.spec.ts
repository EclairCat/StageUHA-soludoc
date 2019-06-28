import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvSingleComponent } from './rdv-single.component';

describe('RdvSingleComponent', () => {
  let component: RdvSingleComponent;
  let fixture: ComponentFixture<RdvSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdvSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
