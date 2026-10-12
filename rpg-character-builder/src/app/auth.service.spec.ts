import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookieService = jasmine.createSpyObj('CookieService', [
      'check',
      'set',
      'delete'
    ]);

    service = new AuthService(cookieService);
  });

  it('should return false when the user is not authenticated', () => {
    cookieService.check.and.returnValue(false);
    expect(service.isAuthenticated()).toBeFalse();
    expect(cookieService.check).toHaveBeenCalledWith('rpg_username');
  });

  it('should return true when the user is authenticated', () => {
    cookieService.check.and.returnValue(true);
    expect(service.isAuthenticated()).toBeTrue();
    expect(cookieService.check).toHaveBeenCalledWith('rpg_username');
  });

  it('should store the username when signing in', () => {
    service.signin('player123');
    expect(cookieService.set).toHaveBeenCalledWith('rpg_username', 'player123');
  });

  it('should delete the authentication cookie when signing out', () => {
    service.signout();

    expect(cookieService.delete).toHaveBeenCalledWith('rpg_username');
  });
});