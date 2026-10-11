import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header>
      <nav>
        <a routerLink="/">RPG Character Builder</a>
        <span> | </span>

        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Home
          <span> | </span>
        </a>

        <a routerLink="/classes" routerLinkActive="active">
          Classes
          <span> | </span>
        </a>

        <a routerLink="/builder" routerLinkActive="active">
          Character Builder
          <span> | </span>
        </a>

        <a routerLink="/about" routerLinkActive="active">
          About
        </a>

      

      </nav>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer>
      <p>WEB 425 · RPG Character Builder</p>
    </footer>
  `
})
export class AppComponent {}
