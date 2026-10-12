import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'signin'
    ]);

    router = jasmine.createSpyObj<Router>('Router', [
      'navigateByUrl'
    ]);

    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: convertToParamMap({})
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form as invalid', () => {
    expect(component.signinForm.invalid).toBeTrue();
    expect(component.signinForm.controls.username.invalid).toBeTrue();
    expect(component.signinForm.controls.accessCode.invalid).toBeTrue();
  });

  it('should reject usernames shorter than 3 characters', () => {
    component.signinForm.controls.username.setValue('Jo');
    expect(component.signinForm.controls.username.invalid).toBeTrue();
    expect(component.signinForm.controls.username.hasError('minlength')).toBeTrue();
  });

  it('should accept usernames with at least 3 characters', () => {
    component.signinForm.controls.username.setValue('John');
    expect(component.signinForm.controls.username.valid).toBeTrue();
  });
  
  it('should reject access codes shorter than 6 characters', () => {
    component.signinForm.controls.accessCode.setValue('ABC12');
    expect(component.signinForm.controls.accessCode.invalid).toBeTrue();
    expect(component.signinForm.controls.accessCode.hasError('pattern')).toBeTrue();
  });

  it('should reject access codes longer than 6 characters', () => {
    component.signinForm.controls.accessCode.setValue('ABC1234');
    expect(component.signinForm.controls.accessCode.invalid).toBeTrue();
  });

  it('should accept a six-character alphanumeric access code', () => {
    component.signinForm.controls.accessCode.setValue('ABC123');
    expect(component.signinForm.controls.accessCode.valid).toBeTrue();
  });

  it('should not display the username error before the field is touched', () => {
    const usernameError = fixture.nativeElement.querySelector('[data-testid="username-error"]');
    expect(usernameError).toBeNull();
  });

  it('should display the username error after the field is touched', () => {
    component.signinForm.controls.username.markAsTouched();
    fixture.detectChanges();
    const usernameError = fixture.nativeElement.querySelector('[data-testid="username-error"]');
    expect(usernameError).not.toBeNull(); 
  });

  it('should reject access codes containing special characters', () => {
    component.signinForm.controls.accessCode.setValue('ABC@23');
    expect(component.signinForm.controls.accessCode.invalid).toBeTrue();
    expect(component.signinForm.controls.accessCode.hasError('pattern')).toBeTrue();
  });

  it('should not sign in when the form is invalid', () => {
    component.onSubmit();
    expect(authService.signin).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should sign in and navigate to the default builder route', ()=>{
    component.signinForm.setValue({
      username: 'player123',
      accessCode: 'ABC123'
    });
    component.onSubmit();
    expect(authService.signin).toHaveBeenCalledWith('player123');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/builder');
  });
});