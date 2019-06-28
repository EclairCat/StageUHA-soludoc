import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceMedecinComponent } from './espace-medecin.component';

describe('EspaceMedecinComponent', () => {
  let component: EspaceMedecinComponent;
  let fixture: ComponentFixture<EspaceMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
