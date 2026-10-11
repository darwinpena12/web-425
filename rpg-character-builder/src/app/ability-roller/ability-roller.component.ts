import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  imports: [],
  template: `
    <section>
      <h1>Ability Score Roller</h1>

      <p> Die: d{{ sides }}</p>

      <p data-testid="roll-result">
        {{ result }}
      </p>

      <button data-testid="roll-button" (click)="rollAbility()">
        Roll Ability
      </button>

      <p>The result is always between 1 and {{ sides }}.</p>
    </section>
  `
})

export class AbilityRollerComponent {
  sides: number;
  result: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private diceService: DiceService
  ) {
    const routeValue = Number(this.route.snapshot.paramMap.get('sides'));

    if (Number.isInteger(routeValue) && routeValue >= 2 ) {
      this.sides = routeValue;
    } else {
      this.sides = 6;
      console.warn('Invalid die size. defaulting to 6.');
    }
  }

  rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}
