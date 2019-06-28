import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinProfilComponent } from './medecin-profil.component';

describe('MedecinProfilComponent', () => {
  let component: MedecinProfilComponent;
  let fixture: ComponentFixture<MedecinProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
