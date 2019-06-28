import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPriseRdvComponent } from './form-prise-rdv.component';

describe('FormPriseRdvComponent', () => {
  let component: FormPriseRdvComponent;
  let fixture: ComponentFixture<FormPriseRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPriseRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPriseRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
