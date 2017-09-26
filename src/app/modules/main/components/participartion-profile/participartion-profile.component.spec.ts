import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipartionProfileComponent } from './participartion-profile.component';

describe('ParticipartionProfileComponent', () => {
  let component: ParticipartionProfileComponent;
  let fixture: ComponentFixture<ParticipartionProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipartionProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipartionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
