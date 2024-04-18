import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdProfileComponent } from './id-profile.component';

describe('IdProfileComponent', () => {
  let component: IdProfileComponent;
  let fixture: ComponentFixture<IdProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
