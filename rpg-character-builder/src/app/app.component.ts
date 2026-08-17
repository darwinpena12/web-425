import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <header>
      <nav>
        <a href="/">RPG Character Builder</a>
        <span> | </span>
        <a href="/">Home</a>
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
