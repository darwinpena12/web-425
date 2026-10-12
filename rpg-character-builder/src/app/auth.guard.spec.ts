import { TestBed } from '@angular/core/testing'; 
import { ActivatedRouteSnapshot, provideRouter, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated'
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authService }
      ]
    });
  });

  it('should allow access when the user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    expect(result).toBeTrue();
    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('should redirect to signin when the user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder' } as RouterStateSnapshot
      )
    );

    const router = TestBed.inject(Router);

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/signin?returnUrl=%2Fbuilder');
  });

  it('should preserve the requested URL in the returnUrl query parameter', () => {
    authService.isAuthenticated.and.returnValue(false);
    const result = TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/builder?mode=edit' } as RouterStateSnapshot
      )
    );

    const router = TestBed.inject(Router);
    const urlTree = result as UrlTree;

    expect(router.serializeUrl(urlTree)).toBe('/signin?returnUrl=%2Fbuilder%3Fmode%3Dedit');
  });
});