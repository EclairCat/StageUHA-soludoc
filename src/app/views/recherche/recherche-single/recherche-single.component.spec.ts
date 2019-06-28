import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheSingleComponent } from './recherche-single.component';

describe('RechercheSingleComponent', () => {
  let component: RechercheSingleComponent;
  let fixture: ComponentFixture<RechercheSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
