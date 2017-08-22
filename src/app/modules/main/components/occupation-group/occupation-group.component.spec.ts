import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationGroupComponent } from './occupation-group.component';

describe('OccupationGroupComponent', () => {
  let component: OccupationGroupComponent;
  let fixture: ComponentFixture<OccupationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
