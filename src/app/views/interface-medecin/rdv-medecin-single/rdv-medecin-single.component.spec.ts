import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvMedecinSingleComponent } from './rdv-medecin-single.component';

describe('RdvMedecinSingleComponent', () => {
  let component: RdvMedecinSingleComponent;
  let fixture: ComponentFixture<RdvMedecinSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdvMedecinSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvMedecinSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
