import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section data-testid="home-page">
      <h1>{{ title }}</h1>

      <p>
        Design a character, choose a class, and prepare for your next adventure.
      </p>

      <h2>Character-building features</h2>

      <h3>Build your character</h3>

      <h4>Available tools</h4>

      <ul data-testid="character-features">
        <li>Browse character classes</li>
        <li>Roll ability scores</li>
        <li>Create and save a character profile</li>
      </ul>
    </section>
  `,
})
export class HomeComponent {
  title = 'Build the hero behind your next adventure';
}
