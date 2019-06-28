import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripSecretaireComponent } from './inscrip-secretaire.component';

describe('InscripSecretaireComponent', () => {
  let component: InscripSecretaireComponent;
  let fixture: ComponentFixture<InscripSecretaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripSecretaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
