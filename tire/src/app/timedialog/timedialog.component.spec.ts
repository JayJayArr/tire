import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedialogComponent } from './timedialog.component';

describe('TimedialogComponent', () => {
  let component: TimedialogComponent;
  let fixture: ComponentFixture<TimedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
