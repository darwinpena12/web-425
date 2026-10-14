
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

interface FeaturedTaco {
  name: string;
  description: string;
  price: number;
  label: 'Spicy' | 'Popular' | 'New';
  isChefPick: boolean;
}

@Component({
  selector: 'app-featured-tacos',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section aria-labelledby="featured-tacos-heading">
      <p class="w4-eyebrow">Customer favorites</p>
      <h1 id="featured-tacos-heading">Featured Tacos</h1>
      <p class="w4-page-intro">
        Discover our featured tacos, prepared fresh with delicious ingredients.
      </p>

      <div class="w4-grid w4-mt-4">
        @for (taco of tacos; track taco.name) {
          <article class="w4-panel">
            <div class="w4-card-header">
              <span class="w4-badge">{{ taco.label }}</span>
            </div>

            <h2>{{ taco.name }}</h2>
            <p>{{ taco.description }}</p>
            <div class="w4-price">
              <strong>{{ taco.price | currency:'USD':'symbol':'1.2-2' }}</strong>
            </div>
          </article>
        }
      </div>

      @if (chefPick) {
        <aside class="w4-panel w4-panel-feature w4-mt-4"
          aria-labelledby="chef-pick-heading">
          <p class="w4-eyebrow">Our recommendation</p>
          <h2 id="chef-pick-heading">Chef's Pick</h2>
          <h3>{{ chefPick.name }}</h3>
          <p>{{ chefPick.description }}</p>
          <strong>{{ chefPick.price | currency:'USD':'symbol':'1.2-2' }}</strong>
        </aside>
      }
    </section>
  `
})
export class FeaturedTacosComponent {
  readonly tacos: FeaturedTaco[] = [
    {
      name: 'Carne Asada',
      description: 'Grilled steak with fresh cilantro, onions, and lime.',
      price: 4.99,
      label: 'Popular',
      isChefPick: true
    },
    {
      name: 'Spicy Chicken',
      description: 'Seasoned chicken with a spicy sauce and fresh toppings.',
      price: 4.49,
      label: 'Spicy',
      isChefPick: false
    },
    {
      name: 'Carnitas',
      description: 'Slow-cooked pork topped with onions and cilantro.',
      price: 4.75,
      label: 'New',
      isChefPick: false
    },
    {
      name: 'Veggie Taco',
      description: 'Fresh vegetables, beans, and house-made salsa.',
      price: 3.99,
      label: 'Popular',
      isChefPick: false
    }
  ];

  get chefPick(): FeaturedTaco | undefined {
    return this.tacos.find((taco) => taco.isChefPick);
  }
}
