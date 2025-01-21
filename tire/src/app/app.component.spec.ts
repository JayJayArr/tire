import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NbAuthService } from '@nebular/auth';
import { EMPTY } from 'rxjs';
import { NbSpinnerService, NbThemeService } from '@nebular/theme';

describe('AppComponent', () => {
  let mockNbAuthService = {
    onTokenChange: () => EMPTY,
  };
  let mockNbThemeService = {};
  let mockNbSpinnerService = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: NbAuthService, useValue: mockNbAuthService },
        { provide: NbThemeService, useValue: mockNbThemeService },
        { provide: NbSpinnerService, useValue: mockNbSpinnerService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'tire' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tire');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tire');
  });
});
