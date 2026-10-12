import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly cookieName = 'rpg_username';
  constructor(private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    return this.cookieService.check(this.cookieName);
  }

  signin(username: string): void {
    this.cookieService.set(this.cookieName, username);
  }

  signout(): void {
    this.cookieService.delete(this.cookieName);
  }
}
