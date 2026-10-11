import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home-page" data-testid="home-page">

      <div class="hero">
        <p class="eyebrow">RPG Character Builder</p>

        <h1>{{ title }}</h1>

        <p class="hero-text">
          Design a character, choose a class, and prepare for your next
          adventure with the tools you need to create your hero.
        </p>

        <div class="hero-actions">
          <a class="btn btn-primary" routerLink="/classes">
            Explore Classes
          </a>

          <a class="btn btn-secondary" routerLink="/about">
            Learn More
          </a>
        </div>
      </div>

      <section class="features">
        <div class="section-heading">
          <p class="eyebrow">Build your character</p>
          <h2>Everything you need to begin your next adventure</h2>
        </div>

        <div class="feature-grid">

          <article class="feature-card">
            <div class="feature-icon">⚔️</div>

            <h3>Character Classes</h3>

            <p>
              Explore different character classes and discover the strengths
              and abilities that make each one unique.
            </p>

            <a routerLink="/classes">View Classes →</a>
          </article>

          <article class="feature-card">
            <div class="feature-icon">🎲</div>

            <h3>Ability Scores</h3>

            <p>
              Roll your character's ability scores and begin shaping the
              foundation of your adventurer.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon">🛡️</div>

            <h3>Build Your Hero</h3>

            <p>
              Combine your choices to create a character ready to face the
              challenges of your next adventure.
            </p>
          </article>

        </div>
      </section>

      <section class="home-cta">
        <h2>Ready to begin your adventure?</h2>

        <p>
          Choose a character class and start building the hero behind your
          next great story.
        </p>

        <a class="btn btn-primary" routerLink="/classes">
          Start Building
        </a>
      </section>

    </section>
  `,
  styleUrl: './home.css',
})
export class HomeComponent {
  title = 'Build the hero behind your next adventure';
}
