import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripClientComponent } from './inscrip-client.component';

describe('InscripClientComponent', () => {
  let component: InscripClientComponent;
  let fixture: ComponentFixture<InscripClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
