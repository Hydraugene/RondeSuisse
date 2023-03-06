import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top8Component } from './top8.component';

describe('Top8Component', () => {
  let component: Top8Component;
  let fixture: ComponentFixture<Top8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
