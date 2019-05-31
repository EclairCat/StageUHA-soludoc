import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripMedecinComponent } from './inscrip-medecin.component';

describe('InscripMedecinComponent', () => {
  let component: InscripMedecinComponent;
  let fixture: ComponentFixture<InscripMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
