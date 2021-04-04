import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassUpdateComponent } from './user-pass-update.component';

describe('UserPassUpdateComponent', () => {
  let component: UserPassUpdateComponent;
  let fixture: ComponentFixture<UserPassUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPassUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
