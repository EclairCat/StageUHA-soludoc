import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMdpComponent } from './new-mdp.component';

describe('NewMdpComponent', () => {
  let component: NewMdpComponent;
  let fixture: ComponentFixture<NewMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
