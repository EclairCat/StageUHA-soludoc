import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinCabinetComponent } from './medecin-cabinet.component';

describe('MedecinCabinetComponent', () => {
  let component: MedecinCabinetComponent;
  let fixture: ComponentFixture<MedecinCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
