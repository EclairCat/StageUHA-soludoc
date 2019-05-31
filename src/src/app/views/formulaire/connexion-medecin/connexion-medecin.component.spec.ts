import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionMedecinComponent } from './connexion-medecin.component';

describe('ConnexionMedecinComponent', () => {
  let component: ConnexionMedecinComponent;
  let fixture: ComponentFixture<ConnexionMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
